import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthCredentialsAPIModel } from '@/domain/Auth'
import { UserAPIModel } from '@/domain/User'
import { mockAuthApi, mockUserApi } from '@/tests/mocks'
import { END_POINTS_API } from '@/types/api'

export const authHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNOUT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<string>('Logout!', { status: 200 })
	}),
	http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNIN}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<AuthCredentialsAPIModel>(mockAuthApi, {
			status: 201,
		})
	}),
	http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNUP}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<UserAPIModel>(mockUserApi, { status: 201 })
	}),
]
