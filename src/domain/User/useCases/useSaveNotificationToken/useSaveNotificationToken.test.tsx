import { renderHook, waitFor } from '@testing-library/react-native'

import { TestProvider } from '@/providers'
import { useNotificationService } from '@/services/notification/useNotificationService'
import { customFaker } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { UserApi } from '../../api'

import { useSaveNotificationToken } from './useSaveNotificationToken'

type UseNotificationService = typeof useNotificationService
type ReturnUseNotificationService = ReturnHookMocked<UseNotificationService>
type MockUseNotificationService = HookMocked<UseNotificationService>

jest.mock('@/services/notification/useNotificationService')

describe('useSaveNotificationToken', () => {
	const spySaveNotification = jest.spyOn(UserApi, 'SaveNotificationToken')
	const mockToken = customFaker.string.uuid()
	const mockGetToken = jest.fn()

	const mockReturnUseNotificationService: ReturnUseNotificationService = {
		getToken: mockGetToken,
	}

	beforeEach(() => {
		mockGetToken.mockReturnValue(mockToken)
		;(useNotificationService as MockUseNotificationService).mockReturnValue(
			mockReturnUseNotificationService
		)
	})

	it('should save token', async () => {
		const { result } = renderHook(useSaveNotificationToken, {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(spySaveNotification).toHaveBeenCalledWith(mockToken)
			expect(mockGetToken).toHaveBeenCalled()
			expect(result.current.token).toBeTruthy()
		})
	})

	it('should not save token when messaging service returns error', async () => {
		mockGetToken.mockRejectedValue(new Error('erro'))

		const { result } = renderHook(useSaveNotificationToken, {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(mockGetToken).toHaveBeenCalled()
			expect(spySaveNotification).not.toHaveBeenCalled()
			expect(result.current.token).toBeNull()
		})
	})
})
