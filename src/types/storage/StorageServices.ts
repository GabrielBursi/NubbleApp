export interface Storage {
	GetItem: <TItem>(key: string) => Promise<TItem | null>
	SetItem: <TItem>(key: string, value: TItem) => Promise<void>
	RemoveItem: (key: string) => Promise<void>
}
