import { UserAPIModel } from '@/domain/User'

export interface AuthCredentialsAPIModel {
	auth: {
		type: string
		token: string
		refreshToken: string
		expires_at: string
	}
	user: UserAPIModel
}
