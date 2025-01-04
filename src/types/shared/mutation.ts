export interface MutationOptions<TData = unknown> {
	onSuccess?: (data: TData) => void
	onError?: (message: string) => void
	errorMessage?: string
}
