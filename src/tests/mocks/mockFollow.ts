import { uniqueId } from 'lodash'

import {
	FollowingUserAPIModel,
	FollowerUserAPIModel,
	FollowUserModel,
} from '@/domain/Follow'

import { generateUserApi } from './mockUser'

export const generateFollowingUserAPI = (): FollowingUserAPIModel => ({
	id: Number(uniqueId()),
	followed_user_id: Number(uniqueId()),
	followed: generateUserApi(),
})

export const generateFollowerUserAPI = (): FollowerUserAPIModel => ({
	id: Number(uniqueId()),
	follower_user_id: Number(uniqueId()),
	follower: generateUserApi(),
})

export const generateFollowUser = (): FollowUserModel => {
	const user = generateUserApi()
	return {
		id: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		username: user.username,
		email: user.email,
		profileUrl: user.profile_url,
		isOnline: user.is_online,
		fullName: user.full_name,
		followId: Number(uniqueId()),
		meta: {
			followingCount: Number(user.meta.following_count),
			followersCount: Number(user.meta.followers_count),
		},
	}
}

export const mockFollowingUsersAPI: FollowingUserAPIModel[] = [
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
	generateFollowingUserAPI(),
]

export const mockFollowerUsersAPI: FollowerUserAPIModel[] = [
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
	generateFollowerUserAPI(),
]

export const mockFollowUsers: FollowUserModel[] = [
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
	generateFollowUser(),
]
