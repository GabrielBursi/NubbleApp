import { MetaDataPaginationAPI } from '@/types/api'
import { MetaDataPaginationApp } from '@/types/shared'

import { customFaker } from '../utils/customFaker'

export const generateMockMetaPaginationApi = (): MetaDataPaginationAPI => {
	const per_page = customFaker.number.int({ min: 5, max: 20 })
	const total = customFaker.number.int({ min: per_page, max: per_page * 50 })
	const last_page = Math.ceil(total / per_page)
	const current_page = customFaker.number.int({ min: 1, max: last_page })

	const baseUrl = 'https://api.example.com/items?page='

	return {
		total,
		per_page,
		current_page,
		last_page,
		first_page: 1,
		first_page_url: `${baseUrl}1`,
		last_page_url: `${baseUrl}${last_page}`,
		next_page_url:
			current_page < last_page ? `${baseUrl}${current_page + 1}` : null,
		previous_page_url:
			current_page > 1 ? `${baseUrl}${current_page - 1}` : null,
	}
}

export const mockMetaPaginationApi: MetaDataPaginationAPI = {
	total: 100,
	per_page: 10,
	current_page: 1,
	last_page: 10,
	first_page: 1,
	first_page_url: 'https://api.example.com/items?page=1',
	last_page_url: 'https://api.example.com/items?page=10',
	next_page_url: 'https://api.example.com/items?page=6',
	previous_page_url: 'https://api.example.com/items?page=4',
}

export const generateMockMetaPaginationApp = (): MetaDataPaginationApp => {
	const perPage = customFaker.number.int({ min: 1, max: 20 })
	const total = customFaker.number.int({ min: perPage, max: perPage * 50 })
	const lastPage = Math.ceil(total / perPage)
	const currentPage = customFaker.number.int({ min: 1, max: lastPage })

	return {
		total,
		perPage,
		currentPage,
		lastPage,
		firstPage: 1,
		hasNextPage: currentPage < lastPage,
		hasPreviousPage: currentPage > 1,
	}
}

export const mockMetaPaginationApp: MetaDataPaginationApp = {
	currentPage: 1,
	firstPage: 1,
	hasNextPage: true,
	hasPreviousPage: false,
	lastPage: 10,
	perPage: 10,
	total: 100,
}
