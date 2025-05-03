import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { UserDetailsModel, UserModel } from '@/domain/User'
import { AppQueryKeys } from '@/types/api'

interface FollowQueryKeys {
	followingId: UserModel['id']
	followerId: UserModel['id']
}

interface FollowOptimisticParams extends FollowQueryKeys {
	isFollowing: boolean
}

export const useFollowOptimisticUpdate = () => {
	const queryClient = useQueryClient()

	const cancelFollowRequests = useCallback(
		async ({ followingId, followerId }: FollowQueryKeys) => {
			await Promise.allSettled([
				queryClient.cancelQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, followingId],
					exact: true,
				}),
				queryClient.cancelQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, followerId],
					exact: true,
				}),
			])
		},
		[queryClient]
	)

	const snapshotFollowData = useCallback(
		({ followingId, followerId }: FollowQueryKeys) => {
			const previousFollowingUser =
				queryClient.getQueryData<UserDetailsModel>([
					AppQueryKeys.USER_BY_ID,
					followingId,
				]) ?? null

			const previousFollowerUser =
				queryClient.getQueryData<UserDetailsModel>([
					AppQueryKeys.USER_BY_ID,
					followerId,
				]) ?? null

			return { previousFollowingUser, previousFollowerUser }
		},
		[queryClient]
	)

	const restoreFollowData = useCallback(
		({ followingId, followerId }: FollowQueryKeys) => {
			const { previousFollowingUser, previousFollowerUser } =
				snapshotFollowData({ followingId, followerId })

			if (previousFollowingUser) {
				queryClient.setQueryData(
					[AppQueryKeys.USER_BY_ID, followingId],
					previousFollowingUser
				)
			}
			if (previousFollowerUser) {
				queryClient.setQueryData(
					[AppQueryKeys.USER_BY_ID, followerId],
					previousFollowerUser
				)
			}
		},
		[queryClient, snapshotFollowData]
	)

	const refreshFollowData = useCallback(
		async ({ followingId, followerId }: FollowQueryKeys) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
				}),
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, followingId],
				}),
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, followerId],
				}),
			])
		},
		[queryClient]
	)

	const applyFollowOptimisticUpdate = useCallback(
		({ followingId, followerId, isFollowing }: FollowOptimisticParams) => {
			const delta = isFollowing ? 1 : -1

			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, followingId],
				(old: UserDetailsModel | undefined): UserDetailsModel | undefined => {
					if (!old) return old
					return {
						...old,
						isFollowing,
						meta: {
							...old.meta,
							followersCount: old.meta.followersCount + delta,
						},
					}
				}
			)

			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, followerId],
				(old: UserDetailsModel | undefined): UserDetailsModel | undefined => {
					if (!old) return old
					return {
						...old,
						meta: {
							...old.meta,
							followingCount: old.meta.followingCount + delta,
						},
					}
				}
			)
		},
		[queryClient]
	)

	return {
		cancelFollowRequests,
		snapshotFollowData,
		restoreFollowData,
		refreshFollowData,
		applyFollowOptimisticUpdate,
	} as const
}
