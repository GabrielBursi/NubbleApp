import { z } from 'zod'

import { schemaTypes } from '@/utils'

export const loginSchema = z.object({
	email: schemaTypes.email,
	password: schemaTypes.password,
})
export type LoginSchema = z.infer<typeof loginSchema>
