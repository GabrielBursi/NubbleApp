import { act, renderHook, waitFor } from '@testing-library/react-native'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'

import { useAuthLogout } from './useAuthLogout'

describe('useAuthLogout', () => {
	const spyLogout = jest.spyOn(AuthServices, 'SignOut')

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
})
