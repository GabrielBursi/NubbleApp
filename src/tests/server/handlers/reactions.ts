import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import {
	PostReactionAPIModel,
	PostReactionBaseAPIModel,
	PostReactionType,
} from '@/domain/PostReaction'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import {
	generateMockPostReactionBaseApi,
	mockReactionsApi,
} from '@/tests/mocks/mockPostReaction'
import { generatePostAPI } from '@/tests/mocks/mockPosts'
import { generateUserApi } from '@/tests/mocks/mockUser'
import { END_POINTS_API, PageAPI } from '@/types/api'

const mockReactionsClone = cloneDeep(mockReactionsApi)
const mockFavorites = mockReactionsClone.filter(
	(r) => r.emoji_type === PostReactionType.FAVORITE
)
const mockLikes = mockReactionsClone.filter(
	(r) => r.emoji_type === PostReactionType.LIKE
)

export const reactionHandlers: HttpHandler[] = [
	http.get(
		`${Config.API_URL}${END_POINTS_API.POST_REACTION}/my-reactions`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			const url = new URL(request.url)
			const reaction_type = url.searchParams.get('reaction_type')

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			if (reaction_type === PostReactionType.FAVORITE)
				return HttpResponse.json<PageAPI<PostReactionAPIModel>>(
					{ data: mockFavorites, meta: mockMetaPaginationApi },
					{ status: 200 }
				)

			if (reaction_type === PostReactionType.LIKE)
				return HttpResponse.json<PageAPI<PostReactionAPIModel>>(
					{ data: mockLikes, meta: mockMetaPaginationApi },
					{ status: 200 }
				)

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
