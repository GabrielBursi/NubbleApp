import { HttpHandler } from 'msw'

import { authHandlers } from './auth'
import { commentHandlers } from './comments'
import { followHandlers } from './follow'
import { postHandlers } from './post'
import { reactionHandlers } from './reactions'
import { usersHandlers } from './users'

export const handlers: HttpHandler[] = [
	...authHandlers,
	...commentHandlers,
	...followHandlers,
	...postHandlers,
	...reactionHandlers,
	...usersHandlers,
]
