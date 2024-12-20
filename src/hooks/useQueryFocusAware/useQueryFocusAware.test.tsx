import { NavigationContainer } from '@react-navigation/native'
import { act, renderHook } from '@testing-library/react-native'

import { useQueryFocusAware } from './useQueryFocusAware'

describe('useQueryFocusAware', () => {
	it('should be return focus true', async () => {
		const { result } = renderHook(useQueryFocusAware, {
			wrapper: NavigationContainer,
		})

		const isFocused = result.current()

		await act(() => {
			expect(isFocused).toBe(true)
		})
	})

	it('should be return focus false', async () => {
		const { result, unmount } = renderHook(useQueryFocusAware, {
			wrapper: NavigationContainer,
		})

		await act(() => {
			unmount()
		})

		const isFocused = result.current()

		await act(() => {
			expect(isFocused).toBe(false)
		})
	})
})
