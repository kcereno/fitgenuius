import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKey?: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error) => void;
}

export const useMutationRequest = <TData, TVariables>({
  mutationFn,
  invalidateKey,
  onSuccess,
  onError,
}: MutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data, variables) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
      setLoading(false);
      setError(null);
      if (onSuccess) onSuccess(data, variables);
    },
    onError: (error) => {
      setLoading(false);
      setError(error.message || 'An error occurred');
      if (onError) onError(error);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isSuccess: mutation.isSuccess, // ✅ Now exposing isSuccess
    loading,
    error,
  };
};
