import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'

import { UserApi } from '../../api'

import { useUserGetById } from './useUserGetById'

describe('useUserGetById', () => {
	const spyGetUserById = jest.spyOn(UserApi, 'GetById')

	it('should disable get user by id query', async () => {
		const { result } = renderHook(useUserGetById, { wrapper: TestProvider })

		await waitFor(() => {
			expect(result.current.user).toBeNull()
			expect(result.current.error).toBeNull()
			expect(spyGetUserById).not.toHaveBeenCalled()
		})
	})

	it('should call user by id service and return the user', async () => {
		const { result } = renderHook(() => useUserGetById(1), {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(result.current.user).toBeTruthy()
			expect(result.current.error).toBeNull()
			expect(spyGetUserById).toHaveBeenCalledWith(1)
		})
	})

	it('should return data with error', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.USERS}/:userId`, () =>
					HttpResponse.error()
				),
			]
		)

		const { result } = renderHook(() => useUserGetById(1), {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(result.current.user).toBeNull()
			expect(result.current.error).toBeTruthy()
			expect(spyGetUserById).toHaveBeenCalledWith(1)
		})
	})
})
