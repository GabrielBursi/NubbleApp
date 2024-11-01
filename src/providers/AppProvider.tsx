import { StatusBar } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'

import { MMKVStorage, initializeStorage } from '@/storage'
import { appTheme } from '@/styles'

export const AppProvider = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient()

	initializeStorage(MMKVStorage)

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<ThemeProvider theme={appTheme}>
					<SafeAreaProvider>
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
