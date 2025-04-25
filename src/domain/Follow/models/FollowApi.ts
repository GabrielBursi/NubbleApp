import { UserAPIModel } from '@/domain/User'

export interface FollowingUserAPIModel {
	id: number
	followed_user_id: number
	followed: UserAPIModel
}

export interface FollowerUserAPIModel {
	id: number
	follower_user_id: number
	follower: UserAPIModel
}
