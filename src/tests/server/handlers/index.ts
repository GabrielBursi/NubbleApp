import { HttpHandler } from 'msw'

import { commentHandlers } from './comments'
import { postHandlers } from './post'

export const handlers: HttpHandler[] = [...postHandlers, ...commentHandlers]
