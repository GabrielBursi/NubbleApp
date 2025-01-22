import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { CommentAPIModel } from '@/domain/Comment'
import { mockCommentsAPI } from '@/tests/mocks/mockComments'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { customFaker } from '@/tests/utils/customFaker'
import { END_POINTS_API, PageAPI } from '@/types/api'

let mockCommentsClone = cloneDeep(mockCommentsAPI)

export const commentHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.COMMENT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<CommentAPIModel>>(
			{ data: mockCommentsClone, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),
	http.post(`${Config.API_URL}${END_POINTS_API.COMMENT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<CommentAPIModel>(mockCommentsClone[0], {
			status: 200,
		})
	}),
	http.delete<{ id: string }>(
		`${Config.API_URL}${END_POINTS_API.COMMENT}/:id`,
		({ request, params }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const commentId = params.id

			mockCommentsClone = mockCommentsClone.filter(
				(com) => com.id !== Number(commentId)
			)

			return HttpResponse.json<{ message: string }>(
				{ message: customFaker.lorem.word() },
				{
					status: 200,
				}
			)
		}
	),
]
