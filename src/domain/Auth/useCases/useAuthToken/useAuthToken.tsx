import { useCallback, useMemo } from 'react'

import { AxiosInstance } from 'axios'

import { NubbleApi } from '@/api/config'

export const useAuthToken = (customInstance?: AxiosInstance) => {
	const instance: AxiosInstance = useMemo(
		() => customInstance ?? NubbleApi,
		[customInstance]
	)

	const updateToken = useCallback(
		(token: string) => {
			instance.defaults.headers.common.Authorization = `Bearer ${token}`
		},
		[instance]
	)

	const removeToken = useCallback(() => {
		instance.defaults.headers.common.Authorization = null
	}, [instance])

	return {
		updateToken,
		removeToken,
		instance,
	} as const
}
