import { Storage } from './models'

export let storage: Storage
export function initializeStorage(storageImpl: Storage) {
	storage = storageImpl
}
