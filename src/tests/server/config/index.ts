import { setupServer } from 'msw/native'
import { handlers } from '../handlers'

export const serverApiTest = setupServer(...handlers)

serverApiTest.events.on('request:start', ({ request }) => {
	console.log('Outgoing:', request.method, request.url)
})
