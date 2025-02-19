import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostAPIModel } from '@/domain/Post'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { generatePostAPI, mockPostsAPI } from '@/tests/mocks/mockPosts'
import { END_POINTS_API, PageAPI } from '@/types/api'

const mockPostsClone = cloneDeep(mockPostsAPI)

export const postHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.POST}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<PostAPIModel>>(
			{ data: mockPostsClone, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),

	http.post(`${Config.API_URL}${END_POINTS_API.POST}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		const newPost = generatePostAPI()

		mockPostsClone.push(newPost)

		return HttpResponse.json<PostAPIModel>(newPost, { status: 200 })
	}),
]
