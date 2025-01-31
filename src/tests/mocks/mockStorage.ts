/* eslint-disable @typescript-eslint/require-await */
import { Storage } from '@/services/storage'

const storage: Record<string, unknown> = {}

export const mockStorage: jest.Mocked<Storage> = {
	getItem: jest.fn(
		async <TValue = unknown>(key: string): Promise<TValue | null> => {
			if (key in storage) {
				return storage[key] as TValue
			}
			return null
		}
	) as jest.MockedFunction<Storage['getItem']>,
	removeItem: jest.fn(async (key) => {
		if (key in storage) {
			delete storage[key]
		}
	}),
	setItem: jest.fn(async <TValue = unknown>(key: string, value: TValue) => {
		storage[key] = value
	}),
	clear: jest.fn(async () => {
		Object.keys(storage).forEach((key) => delete storage[key])
	}),
}
