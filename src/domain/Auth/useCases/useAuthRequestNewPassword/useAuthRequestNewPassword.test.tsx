import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthApi } from '@/domain/Auth'
import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { customAct } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'

import { useAuthRequestNewPassword } from './useAuthRequestNewPassword'

describe('useAuthRequestNewPassword', () => {
	const spyRequestNewPassword = jest.spyOn(AuthApi, 'RequestNewPassword')
	const mockOnError = jest.fn()
	const mockEmail = 'test@example.com'

	it('should request new password correctly', async () => {
		const { result } = renderHook(useAuthRequestNewPassword, {
			wrapper: TestProvider,
		})

		await customAct(() => {
			result.current.requestNewPassword(mockEmail)
		})

		await waitFor(() => {
			expect(spyRequestNewPassword).toHaveBeenCalledWith(mockEmail)
		})
	})

	it('should call onError with default message correctly', async () => {
		const { result } = renderHook(
			() =>
				useAuthRequestNewPassword({
					onError: mockOnError,
					errorMessage: 'default error',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(
					`${Config.API_URL}${END_POINTS_API.AUTH_FORGOT_PASSWORD}`,
					() => HttpResponse.error()
				),
			]
		)

		await customAct(() => {
			result.current.requestNewPassword(mockEmail)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('default error')
		})
	})

	it('should call onError with service message correctly', async () => {
		const { result } = renderHook(
			() => useAuthRequestNewPassword({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(
					`${Config.API_URL}${END_POINTS_API.AUTH_FORGOT_PASSWORD}`,
					() => HttpResponse.error()
				),
			]
		)

		await customAct(() => {
			result.current.requestNewPassword(mockEmail)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('não possível recuperar senha')
		})
	})
})
