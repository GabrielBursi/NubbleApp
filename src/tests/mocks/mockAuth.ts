import { AuthCredentialsAPIModel, AuthCredentialsModel } from '@/domain/Auth'

import { customFaker } from '../utils/customFaker'

import { generateUser, generateUserApi } from './mockUser'

export const generateAuthApi = (): AuthCredentialsAPIModel => ({
	auth: {
		token: customFaker.internet.jwt(),
		type: 'Bearer',
	},
	user: generateUserApi(),
})
export const generateAuth = (): AuthCredentialsModel => ({
	token: customFaker.internet.jwt(),
	user: generateUser(),
})

export const mockAuth = generateAuth()
export const mockAuthApi = generateAuthApi()
