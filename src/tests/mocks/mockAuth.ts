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

/** customFaker.internet.jwt() does not work on react native */
export const mockAuthJWT =
	'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzc1NTYyMzEsImV4cCI6MTczNzYxMTQ1NCwibmJmIjoxNzY4MDkyOTI1LCJpc3MiOiJTaWx2YSBTLkEuIiwic3ViIjoiNjA3NzM1MmYtZWM3MS00ODA4LTllZTItOGY5MTE3MjE5NjAyIiwiYXVkIjoiMmQxNzcxOTYtOGRkMC00MTY3LWE3NzQtOTFkNGI3OWZiYzQ3IiwianRpIjoiMmIyYzFlNGItMGNhMi00YjRkLWEwYmMtOTY0YzY0ZDYzYjA1In0.RjHhw6pr4L7ZrSW7HU1cdtb9g2m9MflXpdfIEAbNOAopZwcfzYbe03tASNaz4R2W'

/** customFaker.internet.jwt() does not work on react native */
export const mockAuthRefreshToken =
	'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzc1NjgwODMsImV4cCI6MTczNzYxMDU0MywibmJmIjoxNzM2MzgzNTg3LCJpc3MiOiJNZWxvLVBlcmVpcmEiLCJzdWIiOiI1ODBmZDI1Ni1kYjUzLTRmNzMtOTYzYy02MDE1NjA3Nzk4NzYiLCJhdWQiOiJiN2ZkMmIwNi04MzhiLTRhZTktYTZiYi03NmJkNmUzNmRlZDUiLCJqdGkiOiIwZjkzZmM2MS1iZGU2LTRiNDUtOTdmNi03ZDRjZWZkMGExMmUifQ.aZ0Th8AjK8iFyCPTUlNP8TjuydZibmWQH2GOrpZnaiVOhK9pQi8m3TVYczT6G73d'

export const generateAuthApi = (): AuthCredentialsAPIModel => ({
	auth: {
		token: mockAuthJWT,
		type: 'Bearer',
		expires_at: customFaker.date.future().toISOString(),
		refreshToken: mockAuthRefreshToken,
	},
	user: generateUserApi(),
})
export const generateAuth = (): AuthCredentialsModel => ({
	token: mockAuthJWT,
	user: generateUser(),
	refreshToken: mockAuthRefreshToken,
	tokenExpiresAt: customFaker.date.future().toISOString(),
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
