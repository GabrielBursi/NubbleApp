export type StrictOmit<TObj extends object, TKey extends keyof TObj> = Omit<
	TObj,
	TKey
>

export type OptionalProps<
	TObj extends object,
	TKey extends keyof TObj,
> = StrictOmit<TObj, TKey> & Partial<Pick<TObj, TKey>>

export type RequiredProps<
	TObj extends object,
	TKey extends keyof TObj,
> = StrictOmit<TObj, TKey> & Required<Pick<TObj, TKey>>

export type NonUndefined<T> = T extends undefined ? never : T
