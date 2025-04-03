import { useQuery } from '@tanstack/react-query'

import { AppQueryKeys } from '@/types/api'

import { UserApi } from '../../api'

export const useUserGetById = (userId?: number) => {
	const { data, refetch, error, isFetching } = useQuery({
		queryKey: [AppQueryKeys.USER_BY_ID, userId],
		queryFn: () => UserApi.GetById(userId!),
		staleTime: 1000 * 30,
		gcTime: 1000 * 15,
		enabled: !!userId,
	})

	return {
		user: data ?? null,
		isLoading: isFetching,
		error,
		refetch,
	} as const
}
