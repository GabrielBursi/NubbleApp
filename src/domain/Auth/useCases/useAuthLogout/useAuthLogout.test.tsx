import { act, renderHook, waitFor } from '@testing-library/react-native'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { useAuthCredentialsService } from '@/services/auth/useAuthCredentials'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useAuthLogout } from './useAuthLogout'

type UseAuthCredentialsService = typeof useAuthCredentialsService
type ReturnUseAuthCredentialsService =
	ReturnHookMocked<UseAuthCredentialsService>
type MockUseAuthCredentialsService = HookMocked<UseAuthCredentialsService>

jest.mock('@/services/auth/useAuthCredentials')

describe('useAuthLogout', () => {
	const spyLogout = jest.spyOn(AuthServices, 'SignOut')
	const mockRemoveAuthCredentials = jest.fn()

	const mockUseAuthCredentialsService: ReturnUseAuthCredentialsService = {
		removeCredentials: mockRemoveAuthCredentials,
	}

	beforeEach(() => {
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
})
