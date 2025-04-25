import { FollowerUserAPIModel, FollowUserModel } from '@/domain/Follow'

import { UserAdapters } from '../User'

export const FromFollowerToUser = (
	followerUser: FollowerUserAPIModel
): FollowUserModel => {
	return {
		followId: followerUser.id,
		...UserAdapters.ToUser(followerUser.follower),
	}
}
