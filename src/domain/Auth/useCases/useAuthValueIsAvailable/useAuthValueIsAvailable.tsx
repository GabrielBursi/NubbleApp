import { useMemo } from 'react'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { AuthApi } from '@/domain/Auth'
import { useDebounce } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

type OptionsUseAuthValueIsAvailable = {
	value: string
	queryKey: AppQueryKeys.USERNAME_AVAILABLE | AppQueryKeys.EMAIL_AVAILABLE
	/** @default 1500 */
	delay?: number
	/** @default true */
	enabled?: boolean
}

/**
 * A custom hook to check the availability of a value, such as a username or email, with debounced queries.
 * This hook utilizes `@tanstack/react-query` for efficient data fetching and caching.
 *
 * @param {OptionsUseAuthValueIsAvailable} opt - Options for configuring the hook.
 * @param {string} opt.value - The value to check for availability (e.g., username or email).
 * @param {AppQueryKeys.USERNAME_AVAILABLE | AppQueryKeys.EMAIL_AVAILABLE} opt.queryKey - The query key to determine whether to check for username or email availability.
 * @param {number} [opt.delay=1500] - The debounce delay (in milliseconds) before making the query.
 * @param {boolean} [opt.enabled=true] - Whether the query should be enabled. If `false`, the query will not execute.
 *
 * @returns {{
 *   isAvailable: boolean;
 *   isUnvailable: boolean;
 *   isFetching: boolean;
 * }}
 *  isAvailable: Indicates if the value is available.
 *  isUnvailable: Indicates if the value is unavailable.
 *  isFetching: Indicates if the query is in progress, including during debouncing.
 * ### Explanation of `isAvailable` and `isUnvailable`
 * - `isAvailable`: Indicates if the value is available. This is derived from the `data` returned by the query.
 *   - `true` if `data` is a truthy value (e.g., the API confirmed availability).
 *   - `false` if `data` is `false` or `undefined` (e.g., the API has not yet confirmed availability).
 *
 * - `isUnvailable`: Indicates if the value is unavailable. This specifically checks if `data` is `false`.
 *   - `true` if the API explicitly returned `false` to indicate unavailability.
 *   - `false` if `data` is `undefined` (still loading) or `true` (available).
 *
 * ### State Behavior Table:
 * | `data` Value          | `isAvailable` | `isUnvailable` |
 * |------------------------|---------------|----------------|
 * | `undefined` (loading) | `false`       | `false`        |
 * | `true` (available)    | `true`        | `false`        |
 * | `false` (unavailable) | `false`       | `true`         |
 *
 */
export const useAuthValueIsAvailable = (
	opt: OptionsUseAuthValueIsAvailable
) => {
	const { queryKey, value, delay = 1500, enabled = true } = opt

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
		enabled: !!debouncedValue.trim().length && !isDebouncing && enabled,
		placeholderData: keepPreviousData,
	})

	return {
		isAvailable: !!data,
		isUnavailable: data === false,
		isFetching: isFetching || isDebouncing,
	} as const
}
