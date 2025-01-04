import { UserAPIModel, UserModel } from '@/domain/User'

import { customFaker } from '../utils/customFaker'

export const generateUserApi = (): UserAPIModel => ({
	id: customFaker.number.int({ min: 1, max: 1000 }),
	first_name: customFaker.person.firstName(),
	last_name: customFaker.person.lastName(),
	username: customFaker.internet.username(),
	email: customFaker.internet.email(),
	profile_url: customFaker.image.url(),
	is_online: customFaker.datatype.boolean(),
	full_name: `${customFaker.person.firstName()} ${customFaker.person.lastName()}`,
	meta: {
		following_count: customFaker.number.int({ min: 1, max: 100 }).toString(),
		followers_count: customFaker.number.int({ min: 1, max: 1000 }).toString(),
	},
})
export const generateUser = (): UserModel => ({
	id: customFaker.number.int({ min: 1, max: 1000 }),
	firstName: customFaker.person.firstName(),
	lastName: customFaker.person.lastName(),
	username: customFaker.internet.username(),
	email: customFaker.internet.email(),
	profileUrl: customFaker.image.url(),
	isOnline: customFaker.datatype.boolean(),
	fullName: `${customFaker.person.firstName()} ${customFaker.person.lastName()}`,
	meta: {
		followingCount: customFaker.number.int({ min: 1, max: 100 }).toString(),
		followersCount: customFaker.number.int({ min: 1, max: 1000 }).toString(),
	},
})

export const mockUser = generateUser()
export const mockUserApi = generateUserApi()
