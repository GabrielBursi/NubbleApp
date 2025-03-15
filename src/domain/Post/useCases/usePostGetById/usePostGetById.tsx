import { useQuery } from '@tanstack/react-query'

import { AppQueryKeys } from '@/types/api'

import { PostApi } from '../../api'

export const usePostGetById = (id?: string) => {
	const { data, refetch, isFetching, error } = useQuery({
		queryKey: [AppQueryKeys.POSTS_BY_ID, id],
		queryFn: () => PostApi.GetById(id!),
		staleTime: 1000 * 30,
		enabled: !!id,
	})

	return {
		post: data ?? null,
		isLoading: isFetching,
		error,
		refetch,
	} as const
}
