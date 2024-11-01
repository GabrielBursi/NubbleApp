import { renderHook } from '@testing-library/react-native'

import { appTheme } from '@/styles'

import { useAppTheme } from './useAppTheme'
import { TestProvider } from '@/providers'

describe('useAppTheme', () => {
	it('should return the app theme correctly', () => {
		const { result } = renderHook(useAppTheme, { wrapper: TestProvider })
		expect(result.current).toStrictEqual(appTheme)
	})
})
