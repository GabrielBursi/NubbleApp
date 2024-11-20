import React from 'react'

import Config from 'react-native-config'
import 'react-native-gesture-handler'

import { AppProvider } from '@/providers'

import { RouterApp } from './src/routes'

function App(): React.JSX.Element {
	return (
		<AppProvider>
			<RouterApp />
		</AppProvider>
	)
}

let AppEntryPoint = App

if (Config.LOAD_STORYBOOK === 'true') {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
	AppEntryPoint = require('./.storybook').default
}

export default AppEntryPoint
