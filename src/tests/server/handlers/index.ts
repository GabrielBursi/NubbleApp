import { HttpHandler } from 'msw'

import { postHandlers } from './post'

export const handlers: HttpHandler[] = [...postHandlers]
