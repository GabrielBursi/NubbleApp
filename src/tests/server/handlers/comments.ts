import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse, PathParams } from 'msw'
import Config from 'react-native-config'

import { CommentAPIModel } from '@/domain/Comment'
import { PostAPIModel } from '@/domain/Post'
import { generateCommentAPI, mockCommentsAPI } from '@/tests/mocks/mockComments'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { mockUserId } from '@/tests/mocks/mockUser'
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
	http.post<PathParams, { post_id: PostAPIModel['id']; message: string }>(
		`${Config.API_URL}${END_POINTS_API.COMMENT}`,
		async ({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()
			const body = await request.json()
			const newComment: CommentAPIModel = {
				...generateCommentAPI(),
				...body,
				user_id: mockUserId,
				user: {
					...generateCommentAPI().user,
					id: mockUserId,
				},
			}

			mockCommentsClone = [...mockCommentsClone, newComment]

			return HttpResponse.json<CommentAPIModel>(mockCommentsClone[0], {
				status: 200,
			})
		}
	),
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
