import React, { PropsWithChildren } from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Config from 'react-native-config'
import { SafeAreaProvider } from 'react-native-safe-area-context'

//? Only use ContextProvider if it is using Context implementation. Zustand implementation doesn't need a provider
import { ContextProvider } from '@/context'
import { useHandleTheme } from '@/services/settings'
import { initializeStorage, MMKVStorage } from '@/services/storage'
import { darkTheme, lightTheme } from '@/styles'

export const queryClient = new QueryClient()

initializeStorage(MMKVStorage)

export const AppProvider = ({ children }: PropsWithChildren) => {
	const theme = useHandleTheme()

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
					<SafeAreaProvider>
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
