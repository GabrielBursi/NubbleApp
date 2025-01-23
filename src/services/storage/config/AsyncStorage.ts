import AsyncStorage from '@react-native-async-storage/async-storage'

import { Storage } from '../models'

export const asyncStorage: Storage = {
	getItem: async (key) => {
		const item = await AsyncStorage.getItem(key)
		if (item) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(item)
		}
		return null
	},
	setItem: async (key, value) => {
		await AsyncStorage.setItem(key, JSON.stringify(value))
	},
	removeItem: async (key) => {
		await AsyncStorage.removeItem(key)
	},
	clear: async () => await AsyncStorage.clear(),
}
