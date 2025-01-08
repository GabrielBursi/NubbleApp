import { act, renderHook, waitFor } from '@testing-library/react-native'

import { AuthServices } from '@/api/services'
import { useAuthToken } from '@/domain/Auth/useCases/useAuthToken/useAuthToken'
import { TestProvider } from '@/providers'
import { useAuthCredentialsService } from '@/services/auth/useAuthCredentials'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useAuthLogout } from './useAuthLogout'

type UseAuthToken = typeof useAuthToken
type ReturnUseAuthToken = ReturnHookMocked<UseAuthToken>
type MockUseAuthToken = HookMocked<UseAuthToken>

type UseAuthCredentialsService = typeof useAuthCredentialsService
type ReturnUseAuthCredentialsService =
	ReturnHookMocked<UseAuthCredentialsService>
type MockUseAuthCredentialsService = HookMocked<UseAuthCredentialsService>

jest.mock('@/services/auth/useAuthCredentials')
jest.mock('@/domain/Auth/useCases/useAuthToken/useAuthToken')

describe('useAuthLogout', () => {
	const spyLogout = jest.spyOn(AuthServices, 'SignOut')
	const mockUpdateToken = jest.fn()
	const mockRemoveToken = jest.fn()
	const mockRemoveAuthCredentials = jest.fn()

	const mockUseAuthToken: ReturnUseAuthToken = {
		updateToken: mockUpdateToken,
		removeToken: mockRemoveToken,
	}

	const mockUseAuthCredentialsService: ReturnUseAuthCredentialsService = {
		removeCredentials: mockRemoveAuthCredentials,
	}

	beforeEach(() => {
		;(useAuthToken as MockUseAuthToken).mockReturnValue(mockUseAuthToken)
		;(
			useAuthCredentialsService as MockUseAuthCredentialsService
		).mockReturnValue(mockUseAuthCredentialsService)
	})

	it('should logout correctly', async () => {
		const { result } = renderHook(useAuthLogout, { wrapper: TestProvider })

		expect(result.current.message).toBeNull()

		await act(() => {
			result.current.logout()
		})

		await waitFor(() => {
			expect(spyLogout).toHaveBeenCalled()
			expect(result.current.message).not.toBeNull()
		})
	})

	it('should remove auth credentials correctly', async () => {
		const { result } = renderHook(useAuthLogout, { wrapper: TestProvider })

		expect(result.current.message).toBeNull()

		await act(() => {
			result.current.logout()
		})

		await waitFor(() => {
			expect(mockRemoveAuthCredentials).toHaveBeenCalled()
		})
	})

	it('should remove token auth correctly', async () => {
		const { result } = renderHook(useAuthLogout, { wrapper: TestProvider })

		expect(result.current.message).toBeNull()

		await act(() => {
			result.current.logout()
		})

		await waitFor(() => {
			expect(mockRemoveToken).toHaveBeenCalled()
		})
	})
})
