/* eslint-disable sonarjs/no-hardcoded-credentials */
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'

import { useAuthLogin } from './useAuthLogin'

describe('useAuthLogin', () => {
	const spyLogin = jest.spyOn(AuthServices, 'SignIn')
	const mockOnError = jest.fn()

	it('should login correctly', async () => {
		const { result } = renderHook(useAuthLogin, { wrapper: TestProvider })

		expect(result.current.authCredentials).toBeNull()

		await act(() => {
			result.current.login({ email: 'jest@email.com', password: 'jest' })
		})

		await waitFor(() => {
			expect(spyLogin).toHaveBeenCalledWith({
				email: 'jest@email.com',
				password: 'jest',
			})
			expect(result.current.authCredentials).not.toBeNull()
		})
	})

	it('should return auth null when it"s error correctly', async () => {
		const { result } = renderHook(() => useAuthLogin(), {
			wrapper: TestProvider,
		})

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNIN}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.login({ email: 'jest@email.com', password: 'jest' })
		})

		await waitFor(() => {
			expect(result.current.authCredentials).toBeNull()
		})
	})

	it('should call onError correctly', async () => {
		const { result } = renderHook(
			() => useAuthLogin({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNIN}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.login({ email: 'jest@email.com', password: 'jest' })
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('email ou senha inválido')
		})
	})
})
