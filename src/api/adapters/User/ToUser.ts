import { UserModel, UserAPIModel } from '@/domain/User'

export const ToUser = (userAPI: UserAPIModel): UserModel => ({
	id: userAPI.id,
	firstName: userAPI.first_name,
	lastName: userAPI.last_name,
	username: userAPI.username,
	email: userAPI.email,
	profileUrl: userAPI.profile_url,
	isOnline: userAPI.is_online,
	fullName: userAPI.full_name,
	meta: {
		followersCount: Number(userAPI.meta.followers_count),
		followingCount: Number(userAPI.meta.following_count),
	},
})
