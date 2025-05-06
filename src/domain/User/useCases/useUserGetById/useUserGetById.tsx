import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useAuthCredentials } from '@/services/auth'
import { AppQueryKeys } from '@/types/api'

import { UserApi } from '../../api'

export const useUserGetById = (userId?: number) => {
	const authCredentials = useAuthCredentials()

	const isCurrentUser = useMemo(
		() => authCredentials?.user.id === userId,
		[authCredentials?.user.id, userId]
	)

	const { data, refetch, error, isFetching, isLoading } = useQuery({
		queryKey: [AppQueryKeys.USER_BY_ID, userId],
		queryFn: () => UserApi.GetById(userId!),
		staleTime: isCurrentUser ? Infinity : 1000 * 30,
		gcTime: 1000 * 15,
		enabled: !!userId && !!authCredentials,
	})

	return {
		user: data ?? null,
		isLoading: isFetching,
		isFirstLoading: isLoading,
		error,
		refetch,
		isCurrentUser,
	} as const
}
