import { PropsWithChildren } from 'react'

import { ThemeProvider } from '@shopify/restyle'
import { renderHook } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useAppSafeArea } from './useAppSafeArea'

import { TestProvider } from '@/providers'
import { appTheme } from '@/styles'

const wrapperWithInitialMetrics = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider theme={appTheme}>
			<SafeAreaProvider
				initialMetrics={{
					frame: { x: 0, y: 0, width: 0, height: 0 },
					insets: { top: 100, left: 50, right: 50, bottom: 50 },
				}}
			>
				{children}
			</SafeAreaProvider>
		</ThemeProvider>
	)
}

describe('useAppSafeArea', () => {
	it('should return default metrics', () => {
		const { result } = renderHook(useAppSafeArea, { wrapper: TestProvider })

		expect(result.current).toStrictEqual({
			bottom: 40,
			left: 0,
			right: 0,
			top: 40,
		})
	})

	it('should return metrics correctly', () => {
		const { result } = renderHook(useAppSafeArea, {
			wrapper: wrapperWithInitialMetrics,
		})

		expect(result.current).toStrictEqual({
			bottom: 50,
			left: 50,
			right: 50,
			top: 100,
		})
	})
})
