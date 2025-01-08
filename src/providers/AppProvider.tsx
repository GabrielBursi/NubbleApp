import React, { PropsWithChildren } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'

//? Only use ContextProvider if it is using Context implementation. Zustand implementation doesn't need a provider
// import { ContextProvider } from '@/context'
import { MMKVStorage, initializeStorage } from '@/storage'
import { appTheme } from '@/styles'

export const queryClient = new QueryClient()

export const AppProvider = ({ children }: PropsWithChildren) => {
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
						{/* <ContextProvider>{children}</ContextProvider> */}
						{children}
					</SafeAreaProvider>
				</ThemeProvider>
			</NavigationContainer>
		</QueryClientProvider>
	)
}
