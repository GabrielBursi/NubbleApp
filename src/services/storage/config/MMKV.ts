/* eslint-disable @typescript-eslint/require-await */
import { MMKV } from 'react-native-mmkv'

import { Storage } from '../models'

const MMKVInstance = new MMKV()
export const MMKVStorage: Storage = {
	getItem: (key) => {
		const item = MMKVInstance.getString(key)
		if (item) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return JSON.parse(item)
		}
		return null
	},
	setItem: async (key, value) => MMKVInstance.set(key, JSON.stringify(value)),
	removeItem: async (key) => MMKVInstance.delete(key),
	clear: async () => MMKVInstance.clearAll(),
}
