import { AxiosError, AxiosInstance } from 'axios'

import { AuthApi } from '@/domain/Auth/api'
import { AuthCredentialsModel } from '@/domain/Auth/models'

export type InterceptorProps = {
	authCredentials: AuthCredentialsModel | null
	saveCredentials: (ac: AuthCredentialsModel) => Promise<void>
	removeCredentials: () => Promise<void>
	isRefreshTokenRequest: boolean
}

export const handleInterceptorRefreshToken = async (
	responseError: AxiosError,
	instance: AxiosInstance,
	options: InterceptorProps
) => {
	const {
		authCredentials,
		removeCredentials,
		saveCredentials,
		isRefreshTokenRequest,
	} = options

	const failedRequest = responseError.config!
	const hasRefreshToken = !!authCredentials?.refreshToken

	if (responseError.response?.status === 401) {
		if (
			!hasRefreshToken ||
			isRefreshTokenRequest ||
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
			((failedRequest as any).sent as boolean)
		) {
			await removeCredentials()
			return Promise.reject(responseError)
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		;(failedRequest as any).sent = true

		const newAuthCredentials = await AuthApi.AuthenticateByRefreshToken(
			authCredentials?.refreshToken
		)

		await saveCredentials(newAuthCredentials)

		failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`

		return instance(failedRequest)
	}

	return Promise.reject(responseError)
}
