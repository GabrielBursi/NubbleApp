import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { TestProvider } from '@/providers'
import { useAuthCredentials } from '@/services/auth/useAuthCredentials'
import { generateUser } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { UserApi } from '../../api'

import { useUserGetById } from './useUserGetById'

type UseAuthCredentials = typeof useAuthCredentials
type ReturnUseAuthCredentials = ReturnHookMocked<UseAuthCredentials>
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

jest.mock('@/services/auth/useAuthCredentials')

describe('useUserGetById', () => {
	const spyGetUserById = jest.spyOn(UserApi, 'GetById')

	const mockUser = generateUser()
	mockUser.id = 2

	const mockUseAuthCredentialsService: ReturnUseAuthCredentials = {
		user: mockUser,
	}

	beforeEach(() => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(
			mockUseAuthCredentialsService
		)
	})

	it('should disable get user by id query', async () => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(null)

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
			expect(result.current.isCurrentUser).toBe(false)
			expect(result.current.error).toBeNull()
			expect(spyGetUserById).toHaveBeenCalledWith(1)
		})
	})

	it('should call user by id service and return the current user', async () => {
		const { result } = renderHook(() => useUserGetById(mockUser.id), {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(result.current.user).toBeTruthy()
			expect(result.current.isCurrentUser).toBe(true)
			expect(result.current.error).toBeNull()
			expect(spyGetUserById).toHaveBeenCalledWith(mockUser.id)
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
