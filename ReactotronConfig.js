import Reactotron, { networking, openInEditor } from 'reactotron-react-native'
import { AsyncStorage } from '@react-native-async-storage/async-storage'


// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure({ name: 'Nubble App' })
	.useReactNative({
		devTools: true,
		asyncStorage: true,
		storybook: true,
		networking: true,
		errors: true,
		logger: true,
	})
	.use(networking())
	.use(openInEditor())
	.connect()

console.tron = reactotron;

export default reactotron
