import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

export type ApplicationWithJob = Tables<'applications'> & {
  jobs: Tables<'jobs'> | null;
};

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export const useApplications = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (*)
        `)
        .eq('candidate_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return data as ApplicationWithJob[];
    },
    enabled: !!profile?.id,
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data: CreateApplicationData) => {
      if (!profile?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('applications')
        .insert({
          candidate_id: profile.id,
          job_id: data.jobId,
          cover_letter: data.coverLetter,
          resume_url: data.resumeUrl,
          status: 'pending',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error) => {
      console.error('Error creating application:', error);
      toast.error('Failed to submit application');
    },
  });

  const hasApplied = (jobId: string) => {
    return applications.some(app => app.job_id === jobId);
  };

  return {
    applications,
    isLoading,
    createApplication: createApplicationMutation.mutateAsync,
    isSubmitting: createApplicationMutation.isPending,
    hasApplied,
  };
};
