import { renderHook, waitFor } from '@testing-library/react-native'

import { TestProvider } from '@/providers'
import { mockMessaging } from '@/tests/mocks'
import { customFaker } from '@/tests/utils'

import { UserApi } from '../../api'

import { useSaveNotificationToken } from './useSaveNotificationToken'

describe('useSaveNotificationToken', () => {
	const spySaveNotification = jest.spyOn(UserApi, 'SaveNotificationToken')
	const mockToken = customFaker.string.uuid()

	beforeEach(() => {
		mockMessaging.getToken.mockReturnValue(mockToken)
	})

	it('should save token', async () => {
		const { result } = renderHook(useSaveNotificationToken, {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(spySaveNotification).toHaveBeenCalledWith(mockToken)
			expect(mockMessaging.getToken).toHaveBeenCalled()
			expect(result.current.token).toBeTruthy()
		})
	})

	it('should not save token when messaging service returns error', async () => {
		mockMessaging.getToken.mockRejectedValue(new Error('erro'))

		const { result } = renderHook(useSaveNotificationToken, {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(mockMessaging.getToken).toHaveBeenCalled()
			expect(spySaveNotification).not.toHaveBeenCalled()
			expect(result.current.token).toBeNull()
		})
	})
})
