import { NavigationContainer } from '@react-navigation/native'
import { renderHook } from '@testing-library/react-native'

import { customAct } from '@/tests/utils'

import { useQueryFocusAware } from './useQueryFocusAware'

describe('useQueryFocusAware', () => {
	it('should be return focus true', async () => {
		const { result } = renderHook(useQueryFocusAware, {
			wrapper: NavigationContainer,
		})

		const isFocused = result.current()

		await customAct(() => {
			expect(isFocused).toBe(true)
		})
	})

	it('should be return focus false', async () => {
		const { result, unmount } = renderHook(useQueryFocusAware, {
			wrapper: NavigationContainer,
		})

		await customAct(() => {
			unmount()
		})

		const isFocused = result.current()

		await customAct(() => {
			expect(isFocused).toBe(false)
		})
	})
})
