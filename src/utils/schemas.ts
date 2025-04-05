import { z } from 'zod'

import { stringUtils } from './string'

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/gim

const username = z
	.string()
	.min(5, 'Username muito curto')
	.regex(userNameRegex, 'Username inválido')
	.toLowerCase()

const name = z
	.string()
	.min(5, 'Nome muito curto')
	.max(50, 'Nome muito longo')
	.transform(stringUtils.capitalizeFirstLetter)

const email = z.string().email('E-mail inválido')

const password = z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')

export const schemaTypes = {
	/**
	 * @min 5
	 * @throws 'Username muito curto'
	 * @regex /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/gim
	 * @throws 'Username inválido'
	 */
	username,
	/**
	 * @min 5
	 * @throws 'Nome muito curto'
	 * @max 50
	 * @throws 'Nome muito longo'
	 */
	name,
	/**
	 * @throws 'E-mail inválido'
	 */
	email,
	/**
	 * @min 8
	 * @throws 'Senha deve ter no mínimo 8 caracteres'
	 */
	password,
} as const
