import {
	AuthCredentialsAPIModel,
	AuthCredentialsModel,
	FieldIsAvailableAPIModel,
	SignInDataModel,
	SignUpDataAPIModel,
	SignUpDataModel,
} from '@/domain/Auth'

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

export const generateSignInData = (): SignInDataModel => ({
	password: customFaker.internet.password(),
	email: customFaker.internet.email(),
	username: customFaker.internet.username(),
})

export const generateSignUpData = (): SignUpDataModel => ({
	password: customFaker.internet.password(),
	email: customFaker.internet.email(),
	username: customFaker.internet.username(),
	firstName: customFaker.person.firstName(),
	lastName: customFaker.person.lastName(),
})

// eslint-disable-next-line sonarjs/no-identical-functions
export const generateSignUpDataApi = (): SignUpDataAPIModel => ({
	password: customFaker.internet.password(),
	email: customFaker.internet.email(),
	username: customFaker.internet.username(),
	firstName: customFaker.person.firstName(),
	lastName: customFaker.person.lastName(),
})

export const generateFieldIsAvailableApi = (): FieldIsAvailableAPIModel => ({
	isAvailable: customFaker.datatype.boolean(),
	message: customFaker.lorem.word(),
})

export const mockAuth = generateAuth()
export const mockAuthApi = generateAuthApi()
export const mockSignInData = generateAuthApi()
export const mockSignUpData = generateSignUpData()
export const mockSignUpDataApi = generateSignUpDataApi()
export const mockFieldIsAvailableApi = generateFieldIsAvailableApi()
