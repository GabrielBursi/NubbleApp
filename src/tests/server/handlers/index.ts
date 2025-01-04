import { HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { commentHandlers } from './comments'
import { postHandlers } from './post'

export const handlers: HttpHandler[] = [
	...authHandlers,
	...commentHandlers,
	...postHandlers,
]
