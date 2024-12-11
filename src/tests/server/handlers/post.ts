import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostAPI } from '@/domain'
import { mockMetaPagination, mockPostsAPI } from '@/tests/mocks'
import { PageAPI } from '@/types/api'

export const postHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}/user/post`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<PostAPI>>(
			{ data: mockPostsAPI, meta: mockMetaPagination },
			{ status: 200 }
		)
	}),
]
