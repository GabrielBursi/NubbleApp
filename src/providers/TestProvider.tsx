import React, { PropsWithChildren } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Config from 'react-native-config'
import { SafeAreaProvider } from 'react-native-safe-area-context'

//? Only use ContextProvider if it is using Context implementation. Zustand implementation doesn't need a provider
import { ContextProvider } from '@/context'
import { lightTheme } from '@/styles'

export const testQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			gcTime: Infinity,
			staleTime: Infinity,
		},
		mutations: {
			gcTime: Infinity,
			retry: false,
		},
	},
})

export const TestProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={testQueryClient}>
			<NavigationContainer>
				<ThemeProvider theme={lightTheme}>
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
						{Number(Config.USE_CONTEXT_SERVICE) ? (
							<ContextProvider>{children}</ContextProvider>
						) : (
							children
						)}
					</SafeAreaProvider>
				</ThemeProvider>
			</NavigationContainer>
		</QueryClientProvider>
	)
}
