import { setupServer } from 'msw/native'

import { handlers } from '../handlers'

export const serverApp = setupServer(...handlers)

serverApp.events.on('request:start', ({ request }) => {
	console.log('Outgoing:', request.method, request.url)
})
