import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useSavedJobs = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const { data: savedJobIds = [], isLoading } = useQuery({
    queryKey: ['saved-jobs', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', profile.id);

      if (error) {
        console.error('Error fetching saved jobs:', error);
        throw error;
      }

      return data.map(item => item.job_id);
    },
    enabled: !!profile?.id,
  });

  const saveJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      if (!profile?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('saved_jobs')
        .insert({ user_id: profile.id, job_id: jobId });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
      toast.success('Job saved!');
    },
    onError: (error) => {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    },
  });

  const unsaveJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      if (!profile?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', profile.id)
        .eq('job_id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] });
      toast.success('Job removed from saved');
    },
    onError: (error) => {
      console.error('Error removing saved job:', error);
      toast.error('Failed to remove job');
    },
  });

  const toggleSavedJob = (jobId: string) => {
    if (savedJobIds.includes(jobId)) {
      unsaveJobMutation.mutate(jobId);
    } else {
      saveJobMutation.mutate(jobId);
    }
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  return {
    savedJobIds,
    isLoading,
    toggleSavedJob,
    isJobSaved,
    isSaving: saveJobMutation.isPending || unsaveJobMutation.isPending,
  };
};
