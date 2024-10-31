import { Storage } from '@/types/storage'
export * from './MMKStorage'

export let StorageApp: Readonly<Storage>

export const initializeStorage = (storage: Storage) => {
	StorageApp = storage
}
