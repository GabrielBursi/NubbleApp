import { FollowUser } from './FollowUser'
import { GetMyFollowersList } from './GetMyFollowersList'
import { GetMyFollowingList } from './GetMyFollowingList'
import { isFollowing } from './IsFollowing'
import { RemoveFollow } from './RemoveFollow'

export const FollowApi = {
	FollowUser,
	GetMyFollowersList,
	GetMyFollowingList,
	isFollowing,
	RemoveFollow,
} as const
