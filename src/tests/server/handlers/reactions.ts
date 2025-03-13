import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import {
	PostReactionAPIModel,
	PostReactionBaseAPIModel,
	PostReactionType,
} from '@/domain/PostReaction'
import {
	generateMockPostReactionBaseApi,
	generatePostAPI,
	generateUserApi,
	mockReactionsApi,
} from '@/tests/mocks'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { END_POINTS_API, PageAPI } from '@/types/api'

const mockReactionsClone = cloneDeep(mockReactionsApi)

export const reactionHandlers: HttpHandler[] = [
	http.get(
		`${Config.API_URL}${END_POINTS_API.POST_REACTION}/my-reactions`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<PageAPI<PostReactionAPIModel>>(
				{ data: mockReactionsClone, meta: mockMetaPaginationApi },
				{ status: 200 }
			)
		}
	),
	http.post<{ post_id: string; reaction_type: PostReactionType }>(
		`${Config.API_URL}${END_POINTS_API.POST_REACTION}/:post_id/:reaction_type`,
		({ request, params }) => {
			console.log('Handler', request.method, request.url)
			console.log({ params })

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const newReaction = generateMockPostReactionBaseApi()

			mockReactionsClone.push({
				...newReaction,
				post: generatePostAPI(),
				user: generateUserApi(),
			})

			return HttpResponse.json<PostReactionBaseAPIModel>(newReaction, {
				status: 200,
			})
		}
	),
]
