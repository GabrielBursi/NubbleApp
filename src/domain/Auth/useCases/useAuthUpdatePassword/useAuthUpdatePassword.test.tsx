import { renderHook, waitFor, act } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { customFaker } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'

import { AuthApi } from '../../api'
import { EditPasswordParamsModel } from '../../models'

import { useAuthUpdatePassword } from './useAuthUpdatePassword'

describe('useAuthUpdatePassword', () => {
	const spyUpdatePassword = jest.spyOn(AuthApi, 'ChangePassword')
	const mockOnSuccess = jest.fn()
	const mockOnError = jest.fn()

	const mockBody: EditPasswordParamsModel = {
		currentPassword: customFaker.internet.password(),
		newPassword: customFaker.internet.password(),
	}

	it('should change password correctly', async () => {
		const { result } = renderHook(
			() => useAuthUpdatePassword({ onSuccess: mockOnSuccess }),
			{
				wrapper: TestProvider,
			}
		)

		await act(() => {
			result.current.updatePassword(mockBody)
		})

		await waitFor(() => {
			expect(spyUpdatePassword).toHaveBeenCalledWith(mockBody)
			expect(mockOnSuccess).toHaveBeenCalled()
			expect(result.current.successMessage).toBeTruthy()
		})
	})

	it('should return message as null when there is an error', async () => {
		const { result } = renderHook(useAuthUpdatePassword, {
			wrapper: TestProvider,
		})

		serverTest.use(
			http.post(`${Config.API_URL}${END_POINTS_API.AUTH_UPDATE_PASSWORD}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.updatePassword(mockBody)
		})

		await waitFor(() => {
			expect(result.current.successMessage).toBeNull()
		})
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() => useAuthUpdatePassword({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			http.post(`${Config.API_URL}${END_POINTS_API.AUTH_UPDATE_PASSWORD}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.updatePassword(mockBody)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith(
				'Houve um erro ao atualizar a senha'
			)
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useAuthUpdatePassword({
					onError: mockOnError,
					errorMessage: 'mensagem personalizada',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			http.post(`${Config.API_URL}${END_POINTS_API.AUTH_UPDATE_PASSWORD}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.updatePassword(mockBody)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('mensagem personalizada')
		})
	})
})
