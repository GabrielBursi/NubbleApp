import { UserModel } from '@/domain/User'

export interface AuthCredentialsModel {
	token: string
	tokenExpiresAt: string
	refreshToken: string
	user: UserModel
}
