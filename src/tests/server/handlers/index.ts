import { http, HttpHandler, HttpResponse } from 'msw'
import Config from 'react-native-config'

export const handlers: HttpHandler[] = [
	http.get(`${Config.API_URL}`, ({ request }) => {
		console.log('Handler', request.method, request.url)
		return HttpResponse.json([], { status: 200 })
	}),
]
