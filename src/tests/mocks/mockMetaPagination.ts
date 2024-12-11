import { MetaDataPaginationAPI } from '@/types/api'

import { customFaker } from '../utils'

export const mockMetaPagination: MetaDataPaginationAPI = {
	current_page: customFaker.number.int({ min: 1, max: 10 }),
	first_page: customFaker.number.int({ min: 1, max: 1 }),
	first_page_url: customFaker.internet.url(),
	last_page: customFaker.number.int({ min: 1, max: 500 }),
	last_page_url: customFaker.internet.url(),
	next_page_url: customFaker.internet.url(),
	per_page: customFaker.number.int({ min: 1, max: 50 }),
	previous_page_url: customFaker.internet.url(),
	total: customFaker.number.int({ min: 1, max: 500 }),
}
