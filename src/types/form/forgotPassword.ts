import { z } from 'zod'

import { schemaTypes } from '@/utils'

export const forgotPasswordSchema = z.object({
	email: schemaTypes.email,
})
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
