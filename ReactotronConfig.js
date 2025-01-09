import Reactotron, { networking, openInEditor, asyncStorage } from 'reactotron-react-native'
import {
	QueryClientManager,
	reactotronReactQuery,
} from 'reactotron-react-query';
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import { queryClient } from '@/providers';

const queryClientManager = new QueryClientManager({
	queryClient,
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
	.use(reactotronReactQuery(queryClientManager))
	.configure({
			name: 'Nubble App',
			onDisconnect: () => {
				queryClientManager.unsubscribe();
			},
	})
	.useReactNative({
		devTools: true,
		asyncStorage: true,
		storybook: true,
		networking: true,
		errors: true,
		logger: true,
	})
	.use(networking())
	.use(asyncStorage())
	.use(openInEditor())
	.connect()

console.tron = reactotron;

export default reactotron
