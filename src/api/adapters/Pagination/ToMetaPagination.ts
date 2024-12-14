import { MetaDataPaginationAPI } from '@/types/api'
import { MetaDataPaginationApp } from '@/types/shared'

/**
 * @description Adapta o MetaDataPaginationAPI para o modelo de MetaDataPaginationApp
 */
export const ToMetaPagination = (
	meta: MetaDataPaginationAPI
): MetaDataPaginationApp => ({
	total: meta.total,
	perPage: meta.per_page,
	currentPage: meta.current_page,
	lastPage: meta.last_page,
	firstPage: meta.first_page,
	hasNextPage: !!meta.next_page_url,
	hasPreviousPage: !!meta.previous_page_url,
})
