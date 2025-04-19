import { renderHook, waitFor, act } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { customFaker } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'

import { UserApi } from '../../api'
import { UpdateUserParams } from '../../models'

import { useUpdateUser } from './useUpdateUser'

describe('useUpdateUser', () => {
	const spyUpdateUser = jest.spyOn(UserApi, 'Update')
	const mockOnSuccess = jest.fn()
	const mockOnError = jest.fn()

	const mockParams: UpdateUserParams = {
		firstName: customFaker.person.firstName(),
		lastName: customFaker.person.lastName(),
		username: customFaker.internet.username(),
	}

	it('should update user correctly', async () => {
		const { result } = renderHook(
			() => useUpdateUser({ onSuccess: mockOnSuccess }),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.update(mockParams)
		})

		await waitFor(() => {
			expect(spyUpdateUser).toHaveBeenCalledWith(mockParams)
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('should return the updated user correctly', async () => {
		const { result } = renderHook(useUpdateUser, { wrapper: TestProvider })

		await act(() => {
			result.current.update(mockParams)
		})

		await waitFor(() => {
			expect(result.current.user).toBeTruthy()
		})
	})

	it('should return user as null when there is an error', async () => {
		const { result } = renderHook(useUpdateUser, { wrapper: TestProvider })

		serverTest.use(
			http.put(`${Config.API_URL}${END_POINTS_API.USERS}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.update(mockParams)
		})

		await waitFor(() => {
			expect(result.current.user).toBeNull()
		})
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() => useUpdateUser({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			http.put(`${Config.API_URL}${END_POINTS_API.USERS}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.update(mockParams)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('erro ao editar usuário')
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useUpdateUser({
					onError: mockOnError,
					errorMessage: 'mensagem personalizada',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			http.put(`${Config.API_URL}${END_POINTS_API.USERS}`, () =>
				HttpResponse.error()
			)
		)

		await act(() => {
			result.current.update(mockParams)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('mensagem personalizada')
		})
	})
})
