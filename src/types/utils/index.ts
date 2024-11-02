export type StrictOmit<TObj extends object, TKey extends keyof TObj> = Omit<
	TObj,
	TKey
>
