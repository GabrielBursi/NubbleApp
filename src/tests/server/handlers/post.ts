import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostAPIModel } from '@/domain/Post'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { generatePostAPI, mockPostsAPI } from '@/tests/mocks/mockPosts'
import { END_POINTS_API, PageAPI } from '@/types/api'

let mockPostsClone = cloneDeep(mockPostsAPI)
const newPost = generatePostAPI()

export const postHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.POST}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<PostAPIModel>>(
			{ data: mockPostsClone, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),
	http.get<{ postId: string }>(
		`${Config.API_URL}${END_POINTS_API.POST}/:postId`,
		({ request, params }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const post = mockPostsClone.find(
				(post) => post.id === Number(params.postId)
			)

			if (!post) return HttpResponse.json(null, { status: 404 })

			return HttpResponse.json<PostAPIModel>(post, { status: 200 })
		}
	),

	http.post(`${Config.API_URL}${END_POINTS_API.POST}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		if (process.env.NODE_ENV === 'test')
			return HttpResponse.json<PostAPIModel>(newPost, { status: 200 })

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		const text = (request as any)._bodyFormData._parts[0][1] as string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
		const image_url = (request as any)._bodyFormData._parts[1][1].uri as string
		mockPostsClone = [
			{
				...newPost,
				text,
				image_url,
				meta: { comments_count: '0', favorite_count: '0', like_count: '0' },
			},
			...mockPostsClone,
		]

		return HttpResponse.json<PostAPIModel>(newPost, { status: 200 })
	}),
]
