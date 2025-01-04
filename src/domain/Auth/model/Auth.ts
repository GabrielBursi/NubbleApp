import { UserModel } from '@/domain/User'

export interface AuthCredentialsModel {
	token: string
	user: UserModel
}
