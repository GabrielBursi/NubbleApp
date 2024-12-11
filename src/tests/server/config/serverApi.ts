import { setupServer } from 'msw/node'

import { handlers } from '../handlers'

export const serverTest = setupServer(...handlers)

serverTest.events.on('request:start', ({ request }) => {
	console.log('Outgoing:', request.method, request.url)
})
