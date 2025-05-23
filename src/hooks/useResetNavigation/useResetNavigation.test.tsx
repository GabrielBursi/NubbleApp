import { act, renderHook } from '@testing-library/react-native'

import { TestProvider } from '@/providers'
import { mockUseNavigation } from '@/tests/mocks'

import { useResetNavigation } from './useResetNavigation'

describe('useResetNavigation', () => {
	it('should reset stack navigator to login and success screen', async () => {
		const { result } = renderHook(useResetNavigation, { wrapper: TestProvider })

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
