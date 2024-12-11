if (__DEV__) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
	const Reactotron = require('./ReactotronConfig').default
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	Reactotron.log('Reactotron Configured')
}

import React, { useEffect, useState } from 'react'

import Config from 'react-native-config'
import 'react-native-gesture-handler'

import { AppProvider } from '@/providers'

import StorybookUIRoot from './.storybook'
import { RouterApp } from './src/routes'

const isMockEnabled = !!Number(Config.LOAD_MOCK)

async function enableMocking() {
	try {
		if (!isMockEnabled) return
		await import('./msw.polyfills')
		const { serverApp } = await import('./src/tests/server/config/serverApp')
		serverApp.listen()
	} catch (error) {
		console.error('Error enabling mocking:', error)
		throw error
	}
}

function useMocking() {
	const [mockReady, setMockReady] = useState(false)
	useEffect(() => {
		const initializeMocking = async () => {
			if (isMockEnabled) {
				try {
					await enableMocking()
					setMockReady(true)
				} catch (error) {
					console.error('Failed to enable mocking:', error)
				}
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		initializeMocking()
	}, [])
	return mockReady
}

function App() {
	const isMockEnabled = Number(Config.LOAD_MOCK)
	const mockReady = useMocking()
	if (isMockEnabled && !mockReady) return null

	return (
		<AppProvider>
			<RouterApp />
		</AppProvider>
	)
}

//@ts-expect-error Reactotron config
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export default console.tron.storybookSwitcher(StorybookUIRoot)(App)
