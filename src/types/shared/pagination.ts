export interface Pagination<TMeta extends object, TData> {
	meta: TMeta
	data: TData[]
}

export interface MetaDataPaginationApp {
	total: number
	perPage: number
	currentPage: number
	lastPage: number
	firstPage: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export interface PageApp<TData = unknown>
	extends Pagination<MetaDataPaginationApp, TData> {}
