import { renderHook } from '@testing-library/react-native'

import { useAppTheme } from './useAppTheme'

import { TestProvider } from '@/providers'
import { appTheme, themeConfig } from '@/styles'

describe('useAppTheme', () => {
	it('should return the app theme correctly', () => {
		const { result } = renderHook(useAppTheme, { wrapper: TestProvider })
		expect(result.current).toStrictEqual({
			...appTheme,
			font: themeConfig.font,
		})
	})
})
