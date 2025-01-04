import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthCredentialsAPIModel } from '@/domain/Auth'
import { mockAuthApi } from '@/tests/mocks'
import { END_POINTS_API } from '@/types/api'

export const authHandlers: HttpHandler[] = [
	http.get(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNOUT}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<string>('Logout!')
	}),
	http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNIN}`, ({ request }) => {
		console.log('Handler', request.method, request.url)

		if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

		return HttpResponse.json<AuthCredentialsAPIModel>(mockAuthApi)
	}),
]
