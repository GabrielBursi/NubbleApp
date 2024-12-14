import { Pagination } from '@/types/shared'

export interface MetaDataPaginationAPI {
	total: number
	per_page: number
	current_page: number
	last_page: number
	first_page: number
	first_page_url: string
	last_page_url: string
	next_page_url: string | null
	previous_page_url: string | null
}

/**
 * @description Interface que define o formato de uma página de dados da API.
 * @template TData Tipo do dado da página.
 */
export interface PageAPI<TData = unknown>
	extends Pagination<MetaDataPaginationAPI, TData> {}

export interface PageQueryParams {
	page?: number
	per_page?: number
}
