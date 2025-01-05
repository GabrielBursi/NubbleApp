/* eslint-disable sonarjs/no-hardcoded-credentials */
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { mockAuthApi } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useAuthToken } from '../useAuthToken/useAuthToken'

import { useAuthLogin } from './useAuthLogin'

type UseAuthToken = typeof useAuthToken
type ReturnUseAuthToken = ReturnHookMocked<UseAuthToken>
type MockUseAuthToken = HookMocked<UseAuthToken>

jest.mock('../useAuthToken/useAuthToken')

describe('useAuthLogin', () => {
	const spyLogin = jest.spyOn(AuthServices, 'SignIn')
	const mockOnError = jest.fn()
	const mockUpdateToken = jest.fn()
	const mockRemoveToken = jest.fn()

	const mockUseAuthToken: ReturnUseAuthToken = {
		updateToken: mockUpdateToken,
		removeToken: mockRemoveToken,
	}

	beforeEach(() => {
		;(useAuthToken as MockUseAuthToken).mockReturnValue(mockUseAuthToken)
	})

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

	it('should update auth token correctly', async () => {
		const { result } = renderHook(useAuthLogin, { wrapper: TestProvider })

		expect(result.current.authCredentials).toBeNull()

		await act(() => {
			result.current.login({ email: 'jest@email.com', password: 'jest' })
		})

		await waitFor(() => {
			expect(mockUpdateToken).toHaveBeenCalledWith(mockAuthApi.auth.token)
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
