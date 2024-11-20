import { renderHook } from '@testing-library/react-native'

import { TestProvider } from '@/providers'
import { appTheme, themeConfig } from '@/styles'

import { useAppTheme } from './useAppTheme'

describe('useAppTheme', () => {
	it('should return the app theme correctly', () => {
		const { result } = renderHook(useAppTheme, { wrapper: TestProvider })
		expect(result.current).toStrictEqual({
			...appTheme,
			font: themeConfig.font,
		})
	})
})
