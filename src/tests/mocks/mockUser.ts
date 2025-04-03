import { uniqueId } from 'lodash'

import { UserAPIModel, UserModel } from '@/domain/User'

import { customFaker } from '../utils/customFaker'

export const mockUserId = Number(uniqueId())

export const generateUserApi = (): UserAPIModel => ({
	id: Number(uniqueId()),
	first_name: customFaker.person.firstName(),
	last_name: customFaker.person.lastName(),
	username: customFaker.internet.username(),
	email: customFaker.internet.email(),
	profile_url: customFaker.image.url(),
	is_online: customFaker.datatype.boolean(),
	full_name: `${customFaker.person.firstName()} ${customFaker.person.lastName()}`,
})
export const generateUser = (): UserModel => ({
	id: Number(uniqueId()),
	firstName: customFaker.person.firstName(),
	lastName: customFaker.person.lastName(),
	username: customFaker.internet.username(),
	email: customFaker.internet.email(),
	profileUrl: customFaker.image.url(),
	isOnline: customFaker.datatype.boolean(),
	fullName: `${customFaker.person.firstName()} ${customFaker.person.lastName()}`,
})

export const mockUsersApi = [
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
	generateUserApi(),
]
export const mockUsers = [
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
	generateUser(),
]
export const mockUser = generateUser()
export const mockUserApi = generateUserApi()
