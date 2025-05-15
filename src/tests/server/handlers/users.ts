import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { UserAPIModel, UserDetailsModel } from '@/domain/User'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import {
	generateUserApi,
	generateUserDetails,
	mockUsersApi,
} from '@/tests/mocks/mockUser'
import { customFaker } from '@/tests/utils'
import { END_POINTS_API, PageAPI } from '@/types/api'

export const usersHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.USERS}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		const url = new URL(request.url)
		const searchParam = url.searchParams.get('search')

		if (searchParam)
			return HttpResponse.json<PageAPI<UserAPIModel>>(
				{
					data: mockUsersApi.filter((user) =>
						user.username.toLowerCase().includes(searchParam.toLowerCase())
					),
					meta: mockMetaPaginationApi,
				},
				{ status: 200 }
			)

		return HttpResponse.json<PageAPI<UserAPIModel>>(
			{ data: mockUsersApi, meta: mockMetaPaginationApi },
			{ status: 200 }
		)
	}),
	http.get(
		`${Config.API_URL}${END_POINTS_API.USERS}/:userId`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<UserAPIModel>(generateUserApi(), { status: 200 })
		}
	),
	http.get(
		`${Config.API_URL}${END_POINTS_API.USERS}/follow/is-following/:userId`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<Pick<UserDetailsModel, 'isFollowing'>>({
				isFollowing: generateUserDetails().isFollowing,
			})
		}
	),
	http.put(`${Config.API_URL}${END_POINTS_API.USERS}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<UserAPIModel>(generateUserApi(), { status: 200 })
	}),

	http.post(
		`${Config.API_URL}${END_POINTS_API.USERS}/notification-token`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<string>(customFaker.string.uuid(), {
				status: 200,
			})
		}
	),

	http.delete(
		`${Config.API_URL}${END_POINTS_API.USERS}/notification-token`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			return HttpResponse.json<string>(customFaker.string.uuid(), {
				status: 200,
			})
		}
	),
]
