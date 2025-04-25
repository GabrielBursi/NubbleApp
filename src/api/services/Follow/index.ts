import { Follow } from './Follow'
import { GetMyFollowersList } from './GetMyFollowersList'
import { GetMyFollowingList } from './GetMyFollowingList'
import { IsFollowing } from './IsFollowing'
import { RemoveFollow } from './RemoveFollow'

export const FollowServices = {
	Follow,
	GetMyFollowersList,
	GetMyFollowingList,
	IsFollowing,
	RemoveFollow,
} as const
