import { FollowingUserAPIModel, FollowUserModel } from '@/domain/Follow'

import { UserAdapters } from '../User'

export const FromFollowingToUser = (
	followingUser: FollowingUserAPIModel
): FollowUserModel => {
	return {
		followId: followingUser.id,
		...UserAdapters.ToUser(followingUser.followed),
	}
}
