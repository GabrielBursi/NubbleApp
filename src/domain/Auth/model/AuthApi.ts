import { UserAPIModel } from '@/domain/User'

export interface AuthCredentialsAPIModel {
	auth: {
		type: string
		token: string
	}
	user: UserAPIModel
}
