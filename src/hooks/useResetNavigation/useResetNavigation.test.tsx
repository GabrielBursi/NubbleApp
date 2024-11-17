import { act, renderHook } from '@testing-library/react-native'

import { useResetNavigation } from './useResetNavigation'

import { mockUseNavigation } from '@/tests/mocks'

describe('useResetNavigation', () => {
	it('should reset stack navigator to login and success screen', async () => {
		const { result } = renderHook(useResetNavigation)

		const resetSuccess = result.current.resetSuccess

		await act(() => {
			resetSuccess({
				description: 'jest',
				icon: { name: 'arrowLeft' },
				title: 'rtl',
			})
		})

		expect(mockUseNavigation.reset).toHaveBeenCalledWith({
			index: 1,
			routes: [
				{ name: 'LoginScreen' },
				{
					name: 'SuccessScreen',
					params: {
						description: 'jest',
						icon: { name: 'arrowLeft' },
						title: 'rtl',
					},
				},
			],
		})
	})
})
