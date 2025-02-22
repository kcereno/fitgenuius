import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKey?: string; // Optional: Query key to refresh after mutation
  onSuccess?: (data: TData) => void;
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
  const [error, setError] = useState<string | null>(null); // Track errors

  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn,
    onMutate: () => {
      setLoading(true);
      setError(null); // Reset error before mutation starts
    },
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      }
      setLoading(false);
      setError(null); // Clear error on success
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      setLoading(false);
      setError(error.message || 'An error occurred'); // Store error message
      if (onError) onError(error);
    },
  });

  return { mutate: mutation.mutate, loading, error };
};
