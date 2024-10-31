import { http, HttpHandler, HttpResponse } from 'msw'

export const handlers: HttpHandler[] = [
	http.get('/handler', ({ request }) => {
		console.log('Handler', request.method, request.url)
		return HttpResponse.json({}, { status: 200 })
	}),
]
