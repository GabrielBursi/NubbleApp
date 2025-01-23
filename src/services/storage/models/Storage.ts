export interface Storage {
	getItem: <TValue = unknown>(key: string) => Promise<TValue | null>
	setItem: <TValue = unknown>(key: string, value: TValue) => Promise<void>
	removeItem: (key: string) => Promise<void>
	clear: () => Promise<void>
}
