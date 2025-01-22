import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/native'

import { handlers } from '../handlers'

export const serverApp = setupServer(
	...[
		...handlers,
		// eslint-disable-next-line sonarjs/no-clear-text-protocols
		http.post('http://10.0.2.2:8081/symbolicate', () =>
			HttpResponse.json({}, { status: 200 })
		),
	]
)

serverApp.events.on('request:start', ({ request }) => {
	console.log('Outgoing:', request.method, request.url)
})
