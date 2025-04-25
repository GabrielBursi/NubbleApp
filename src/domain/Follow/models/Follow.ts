import { UserModel } from '@/domain/User'

export interface FollowUserModel extends UserModel {
	followId: number
}
