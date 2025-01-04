import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { CommentAPIModel } from '@/domain/Comment'
import { mockCommentsAPI } from '@/tests/mocks/mockComments'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { customFaker } from '@/tests/utils/customFaker'
import { END_POINTS_API } from '@/types/api'
import { PageAPI } from '@/types/api'

export const commentHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.COMMENT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<CommentAPIModel>>(
			{ data: mockCommentsAPI, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),
	http.post(`${Config.API_URL}${END_POINTS_API.COMMENT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<CommentAPIModel>(mockCommentsAPI[0], {
			status: 200,
		})
	}),
	http.delete(
		`${Config.API_URL}${END_POINTS_API.COMMENT}/:id`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<{ message: string }>(
				{ message: customFaker.lorem.word() },
				{
					status: 200,
				}
			)
		}
	),
]
