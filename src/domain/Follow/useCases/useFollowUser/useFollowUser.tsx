import { useCallback, useMemo } from 'react'

import { useMutation } from '@tanstack/react-query'

import { UserModel } from '@/domain/User'
import { useFollowOptimisticUpdate } from '@/hooks'
import { useAuthCredentials } from '@/services/auth'
import { MutationOptions } from '@/types/shared'

import { FollowApi } from '../../api'

export const useFollowUser = (
	targetUserId: UserModel['id'],
	options?: {
		followUserOptions?: MutationOptions<UserModel>
		removeFollowingOptions?: MutationOptions<void>
	}
) => {
	const ac = useAuthCredentials()
	const {
		cancelFollowRequests,
		applyFollowOptimisticUpdate,
		snapshotFollowData,
		restoreFollowData,
		refreshFollowData,
	} = useFollowOptimisticUpdate()

	const authUserId = useMemo(() => ac?.user.id ?? null, [ac])

	const {
		mutate: followUser,
		isPending: isPendingFollowUser,
		data: followingUser,
		error: errorFollowUser,
		isSuccess: isSuccessFollowUser,
		reset: resetFollowUser,
		context: contextFollowUser,
	} = useMutation({
		mutationFn: () => FollowApi.FollowUser(targetUserId),
		onMutate: async () => {
			if (authUserId === null) return null
			await cancelFollowRequests({
				followerId: authUserId,
				followingId: targetUserId,
			})
			const { previousFollowerUser, previousFollowingUser } =
				snapshotFollowData({
					followerId: authUserId,
					followingId: targetUserId,
				})
			applyFollowOptimisticUpdate({
				followerId: authUserId,
				followingId: targetUserId,
				isFollowing: true,
			})
			return { previousFollowingUser, previousFollowerUser }
		},
		onError: async () => {
			if (authUserId === null) return null
			options?.followUserOptions?.onError?.(
				options?.followUserOptions?.errorMessage ?? 'erro ao seguir usuário'
			)
			await cancelFollowRequests({
				followerId: authUserId,
				followingId: targetUserId,
			})
			restoreFollowData({ followerId: authUserId, followingId: targetUserId })
		},
		onSuccess: options?.followUserOptions?.onSuccess,
		onSettled: async (followingUser) => {
			if (authUserId === null || !followingUser) return null
			await refreshFollowData({
				followerId: authUserId,
				followingId: followingUser.id,
			})
		},
	})

	const {
		mutate: removeFollowing,
		isPending: isPendingRemoveFollowing,
		error: errorRemoveFollowing,
		isSuccess: isSuccessRemoveFollowing,
		reset: resetRemoveFollowing,
		context: contextRemoveFollowing,
	} = useMutation({
		mutationFn: () => FollowApi.RemoveFollow(targetUserId),
		onMutate: async () => {
			if (authUserId === null) return null
			await cancelFollowRequests({
				followerId: targetUserId,
				followingId: authUserId,
			})
			const { previousFollowerUser, previousFollowingUser } =
				snapshotFollowData({
					followerId: targetUserId,
					followingId: authUserId,
				})
			applyFollowOptimisticUpdate({
				followerId: targetUserId,
				followingId: authUserId,
				isFollowing: false,
			})
			return { previousFollowingUser, previousFollowerUser }
		},
		onError: async () => {
			if (authUserId === null) return null
			options?.removeFollowingOptions?.onError?.(
				options?.removeFollowingOptions?.errorMessage ??
					'erro ao deixar de seguir o usuário'
			)
			await cancelFollowRequests({
				followerId: targetUserId,
				followingId: authUserId,
			})
			restoreFollowData({ followerId: targetUserId, followingId: authUserId })
		},
		onSuccess: options?.removeFollowingOptions?.onSuccess,
		onSettled: async () => {
			if (authUserId === null) return null
			await refreshFollowData({
				followerId: targetUserId,
				followingId: authUserId,
			})
		},
	})

	const undoRemoveFollow = useCallback(followUser, [followUser])

	return {
		followUser,
		isPendingFollowUser,
		followingUser: followingUser ?? null,
		errorFollowUser,
		isSuccessFollowUser,
		resetFollowUser,
		contextFollowUser: contextFollowUser ?? null,
		removeFollowing,
		isPendingRemoveFollowing,
		errorRemoveFollowing,
		isSuccessRemoveFollowing,
		resetRemoveFollowing,
		contextRemoveFollowing: contextRemoveFollowing ?? null,
		undoRemoveFollow,
	} as const
}
