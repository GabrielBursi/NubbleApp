import { StatusBar } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'

import { theme } from '@/styles'

export const TestProvider = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: Infinity,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<SafeAreaProvider
						initialMetrics={{
							frame: { x: 0, y: 0, width: 0, height: 0 },
							insets: { top: 0, left: 0, right: 0, bottom: 0 },
						}}
					>
						<StatusBar
							barStyle="dark-content"
							backgroundColor="transparent"
							translucent
						/>
						{children}
					</SafeAreaProvider>
				</ThemeProvider>
			</NavigationContainer>
		</QueryClientProvider>
	)
}
