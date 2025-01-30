import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { UserAPIModel } from '@/domain/User'
import { mockMetaPaginationApi, mockUsersApi } from '@/tests/mocks'
import { END_POINTS_API, PageAPI } from '@/types/api'

export const usersHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.USERS}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<PageAPI<UserAPIModel>>(
			{ data: mockUsersApi, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),
]
