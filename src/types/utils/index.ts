export type StrictOmit<TObj extends object, TKey extends keyof TObj> = Omit<
	TObj,
	TKey
>

export type OptionalPros<
	TObj extends object,
	TKey extends keyof TObj,
> = StrictOmit<TObj, TKey> & Partial<Pick<TObj, TKey>>
