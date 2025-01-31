import { useCallback } from 'react'

import { StorageKeys } from './models'
import { storage } from './storage'

export const useStorage = <TValue = unknown>(key: StorageKeys) => {
	const getItem = useCallback(
		async (): Promise<TValue | null> => await storage.getItem<TValue>(key),
		[key]
	)

	const setItem = useCallback(
		async (value: TValue): Promise<void> => await storage.setItem(key, value),
		[key]
	)

	const removeItem = useCallback(
		async (): Promise<void> => await storage.removeItem(key),
		[key]
	)

	const clear = useCallback(
		async (): Promise<void> => await storage.clear(),
		[]
	)

	return {
		getItem,
		setItem,
		removeItem,
		clear,
	}
}
