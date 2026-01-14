import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { jobs as staticJobs } from '@/lib/data';

export type DatabaseJob = Tables<'jobs'>;

// Transform database job to match the format expected by JobCard
export interface TransformedJob {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship' | 'Hybrid';
  salary: string;
  posted: string;
  featured?: boolean;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  about: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
}

// Map database job_type enum to display format
const mapJobType = (dbType: string): TransformedJob['type'] => {
  const typeMap: Record<string, TransformedJob['type']> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'remote': 'Remote',
    'contract': 'Contract',
    'internship': 'Internship',
  };
  return typeMap[dbType] || 'Full-time';
};

// Format salary for display
const formatSalary = (min?: number | null, max?: number | null): string => {
  if (!min && !max) return 'Competitive';
  if (min && max) return `$${Math.round(min / 1000)}k - $${Math.round(max / 1000)}k`;
  if (min) return `$${Math.round(min / 1000)}k+`;
  if (max) return `Up to $${Math.round(max / 1000)}k`;
  return 'Competitive';
};

// Format date for display
const formatPosted = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return '1 week ago';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return '1 month ago';
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Transform database job to the format used by components
export const transformJob = (job: DatabaseJob): TransformedJob => ({
  id: job.id,
  title: job.title,
  company: job.company,
  logo: job.company_logo || '',
  location: job.location,
  type: mapJobType(job.job_type),
  salary: formatSalary(job.salary_min, job.salary_max),
  posted: formatPosted(job.created_at),
  featured: false, // Could be a database field in the future
  skills: job.skills || [],
  description: job.description,
  requirements: job.requirements || [],
  benefits: job.benefits || [],
  about: job.description, // Using description as about for now
  experienceLevel: job.experience_level || undefined,
  salaryMin: job.salary_min || undefined,
  salaryMax: job.salary_max || undefined,
});

// Transform static job to use string ID for consistency
export const transformStaticJob = (job: typeof staticJobs[0]): TransformedJob => ({
  ...job,
  id: job.id.toString(),
  about: job.about || job.description,
});

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      return data;
    },
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      // First try to fetch from database
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching job:', error);
        throw error;
      }

      if (data) {
        return transformJob(data);
      }

      // Fallback to static data for numeric IDs
      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        const staticJob = staticJobs.find(j => j.id === numericId);
        if (staticJob) {
          return transformStaticJob(staticJob);
        }
      }

      return null;
    },
    enabled: !!id,
  });
};

// Hook that combines database and static jobs
export const useAllJobs = () => {
  const { data: dbJobs, isLoading, error } = useJobs();

  // Transform database jobs
  const transformedDbJobs = (dbJobs || []).map(transformJob);
  
  // If we have database jobs, use only those; otherwise fallback to static data
  const allJobs = transformedDbJobs.length > 0 
    ? transformedDbJobs 
    : staticJobs.map(transformStaticJob);

  return {
    jobs: allJobs,
    isLoading,
    error,
    hasDbJobs: transformedDbJobs.length > 0,
  };
};
