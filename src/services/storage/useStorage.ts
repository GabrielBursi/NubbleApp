import { useCallback } from 'react'

import { StorageKeys } from './models'
import { storage } from './storage'

export const useStorage = <TValue = unknown>(key: StorageKeys) => {
	const get = useCallback(
		async (): Promise<TValue | null> => await storage.getItem<TValue>(key),
		[key]
	)

	const set = useCallback(
		async (value: TValue): Promise<void> => await storage.setItem(key, value),
		[key]
	)

	const remove = useCallback(
		async (): Promise<void> => await storage.removeItem(key),
		[key]
	)

	return {
		get,
		set,
		remove,
	}
}
