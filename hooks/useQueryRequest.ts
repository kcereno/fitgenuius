import { useQuery } from '@tanstack/react-query';

interface QueryOptions<TData> {
  queryKey: string | string[]; // ✅ Can be a single key or an array
  queryFn: () => Promise<TData>;
  enabled?: boolean; // ✅ Allows conditional fetching
  staleTime?: number; // ✅ Custom cache time
  refetchOnWindowFocus?: boolean; // ✅ Optionally disable auto-refetching
}

export const useQueryRequest = <TData>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 1000 * 60 * 5, // ✅ Default: Cache for 5 minutes
  refetchOnWindowFocus = false,
}: QueryOptions<TData>) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery<TData>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey], // ✅ Ensures array format
    queryFn,
    enabled,
    staleTime,
    refetchOnWindowFocus,
  });

  return { data, error, isLoading, isFetching, refetch };
};
