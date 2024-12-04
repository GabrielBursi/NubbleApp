import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import Config from 'react-native-config'

async function setupDevEnv() {
	if (Number(Config.LOAD_MOCK)) {
		return false
	}

	import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
	await import('./msw.polyfills')
	const { serverApiTest } = await import('./src/tests/server')
	serverApiTest.listen()
	return true
}

AppRegistry.registerComponent(appName, () => {
	setupDevEnv().then((isDev) => isDev && console.log('server mock is running!'))
	return App
})
