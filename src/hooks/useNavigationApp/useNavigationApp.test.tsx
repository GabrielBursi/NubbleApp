import { renderHook } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'

import { useNavigationApp } from './useNavigationApp'

describe('useNavigationApp', () => {
	it('should navigate with app stack', () => {
		const { result } = renderHook(useNavigationApp)

		result.current.navigationAppStack.navigate('SettingsScreen')

		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})

	it('should navigate with auth stack', () => {
		const { result } = renderHook(useNavigationApp)

		result.current.navigationAuthStack.navigate('SignUpScreen')

		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})
})
