import { z } from 'zod'

import { schemaTypes } from '@/utils'

export const forgotPasswordSchema = z.object({
	email: schemaTypes.email,
})
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const editPasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Esse campo é obrigatório'),
		newPassword: schemaTypes.password,
		confirmedPassword: schemaTypes.password,
	})
	.refine((data) => data.confirmedPassword === data.newPassword, {
		message: 'As senhas não são iguais',
		path: ['confirmedPassword'],
	})

export type EditPasswordSchema = z.infer<typeof editPasswordSchema>
