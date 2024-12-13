import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostAPIModel } from '@/domain/Post'
import { mockMetaPagination } from '@/tests/mocks/mockMetaPagination'
import { mockPostsAPI } from '@/tests/mocks/mockPosts'
import { PageAPI } from '@/types/api'

export const postHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}/user/post`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<PostAPIModel>>(
			{ data: mockPostsAPI, meta: mockMetaPagination },
			{ status: 200 }
		)
	}),
]
