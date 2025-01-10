import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { mockSignUpData } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'

import { useAuthSignUp } from './useAuthSignUp'

describe('useAuthSignUp', () => {
	const spySignUp = jest.spyOn(AuthServices, 'SignUp')
	const mockOnError = jest.fn()

	it('should signup correctly', async () => {
		const { result } = renderHook(useAuthSignUp, { wrapper: TestProvider })

		await act(() => {
			result.current.signUp(mockSignUpData)
		})

		await waitFor(() => {
			expect(spySignUp).toHaveBeenCalledWith(mockSignUpData)
		})
	})

	it('should call onError with default message correctly', async () => {
		const { result } = renderHook(
			() => useAuthSignUp({ onError: mockOnError, errorMessage: 'default' }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNUP}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.signUp(mockSignUpData)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('default')
		})
	})

	it('should call onError with service message correctly', async () => {
		const { result } = renderHook(
			() => useAuthSignUp({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNUP}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.signUp(mockSignUpData)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('não foi possível criar a conta')
		})
	})
})
