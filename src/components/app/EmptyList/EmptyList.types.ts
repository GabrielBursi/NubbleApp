export type EmptyListProps = {
	loading?: boolean
	error?: unknown
	refetch?: (() => Promise<unknown>) | (() => unknown)
	/** @default 'A lista está vazia' */
	emptyMessage?: string
	/** @default 'Ocorreu um erro ao tentar carregar a lista' */
	errorMessage?: string
}
