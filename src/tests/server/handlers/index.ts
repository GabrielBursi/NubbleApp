import { HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { commentHandlers } from './comments'
import { postHandlers } from './post'
import { usersHandlers } from './users'

export const handlers: HttpHandler[] = [
	...authHandlers,
	...commentHandlers,
	...postHandlers,
	...usersHandlers,
]
