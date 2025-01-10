import { useMemo } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { AuthApi } from '@/domain/Auth'
import { useDebounce } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

export const useAuthValueIsAvailable = (
	value: string,
	queryKey: AppQueryKeys.USERNAME_AVAILABLE | AppQueryKeys.EMAIL_AVAILABLE,
	delay = 1500
) => {
	const { debouncedValue, isDebouncing } = useDebounce(value, delay)

	const queryFn = useMemo(() => {
		if (queryKey === AppQueryKeys.USERNAME_AVAILABLE)
			return AuthApi.IsUserNameAvailable

		return AuthApi.IsEmailAvailable
	}, [queryKey])

	const { data, isFetching } = useQuery({
		queryKey: [queryKey, debouncedValue],
		queryFn: () => queryFn(debouncedValue),
		retry: false,
		staleTime: 20000,
		gcTime: 1 * 60 * 1000,
		enabled: !!debouncedValue.trim().length && !isDebouncing,
		placeholderData: keepPreviousData,
	})

	return {
		isAvailable: !!data,
		isFetching,
	} as const
}
