import { useCallback, useMemo } from 'react'

import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

import { NubbleApi } from '@/api/config'
import {
	handleInterceptorRefreshToken,
	InterceptorProps,
} from '@/api/config/interceptors'
import { END_POINTS_API } from '@/types/api'
import { StrictOmit } from '@/types/utils'

export const useAuthToken = (customInstance?: AxiosInstance) => {
	const axiosApiInstance: AxiosInstance = useMemo(
		() => customInstance ?? NubbleApi,
		[customInstance]
	)

	const updateToken = useCallback(
		(token: string) => {
			axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${token}`
		},
		[axiosApiInstance]
	)

	const removeToken = useCallback(() => {
		axiosApiInstance.defaults.headers.common.Authorization = null
	}, [axiosApiInstance])

	const verifyIfIsRefreshTokenRequest = useCallback(
		(request: AxiosRequestConfig) => {
			const url = request.url
			return url === END_POINTS_API.AUTH_REFRESH_TOKEN
		},
		[]
	)

	const registerInterceptor = useCallback(
		(options: StrictOmit<InterceptorProps, 'isRefreshTokenRequest'>) => {
			const interceptor = axiosApiInstance.interceptors.response.use(
				(response) => response,
				async (responseError: AxiosError) => {
					const failedRequest = responseError.config
					if (!failedRequest) return Promise.reject(responseError)
					const isRefreshTokenRequest =
						verifyIfIsRefreshTokenRequest(failedRequest)

					return await handleInterceptorRefreshToken(
						responseError,
						axiosApiInstance,
						{
							isRefreshTokenRequest,
							...options,
						}
					)
				}
			)

			return () => axiosApiInstance.interceptors.response.eject(interceptor)
		},
		[axiosApiInstance, verifyIfIsRefreshTokenRequest]
	)

	return {
		updateToken,
		removeToken,
		instance: axiosApiInstance,
		verifyIfIsRefreshTokenRequest,
		registerInterceptor,
	} as const
}
