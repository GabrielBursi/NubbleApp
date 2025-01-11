import { z } from 'zod'

import { stringUtils } from '@/utils/string'

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim

export const signUpSchema = z.object({
	username: z
		.string()
		.min(5, 'user name muito curto')
		.regex(userNameRegex, 'username inválido')
		.toLowerCase(),
	firstName: z
		.string()
		.min(2, 'nome muito curto')
		.max(50, 'nome muito longo')
		.transform(stringUtils.capitalizeFirstLetter),
	lastName: z
		.string()
		.min(3, 'sobrenome muito curto')
		.max(50, 'nome muito longo')
		.transform(stringUtils.capitalizeFirstLetter),
	email: z.string().email('email inválido'),
	password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
})
export type SignUpSchema = z.infer<typeof signUpSchema>
