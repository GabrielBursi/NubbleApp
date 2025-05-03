import { useCallback, useMemo } from 'react'

import { useMutation } from '@tanstack/react-query'

import { UserModel } from '@/domain/User'
import { useFollowOptimisticUpdate } from '@/hooks'
import { useAuthCredentials } from '@/services/auth'
import { MutationOptions } from '@/types/shared'

import { FollowApi } from '../../api'

export const useFollowUser = (
	followingId: UserModel['id'],
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

	const followerId = useMemo(() => ac?.user.id ?? null, [ac])

	const {
		mutate: followUser,
		isPending: isPendingFollowUser,
		data: followingUser,
		error: errorFollowUser,
		isSuccess: isSuccessFollowUser,
		reset: resetFollowUser,
		context: contextFollowUser,
	} = useMutation({
		mutationFn: () => FollowApi.FollowUser(followingId),
		onMutate: async () => {
			if (followerId === null) return null
			await cancelFollowRequests({ followerId, followingId })
			const { previousFollowerUser, previousFollowingUser } =
				snapshotFollowData({ followerId, followingId })
			applyFollowOptimisticUpdate({
				followerId,
				followingId,
				isFollowing: true,
			})
			return { previousFollowingUser, previousFollowerUser }
		},
		onError: async () => {
			if (followerId === null) return null
			options?.followUserOptions?.onError?.(
				options?.followUserOptions?.errorMessage ?? 'erro ao seguir usuário'
			)
			await cancelFollowRequests({ followerId, followingId })
			restoreFollowData({ followerId, followingId })
		},
		onSuccess: options?.followUserOptions?.onSuccess,
		onSettled: async (followingUser) => {
			if (followerId === null || !followingUser) return null
			await refreshFollowData({
				followerId,
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
		mutationFn: () => FollowApi.RemoveFollow(followingId),
		onMutate: async () => {
			if (followerId === null) return null
			await cancelFollowRequests({ followerId, followingId })
			const { previousFollowerUser, previousFollowingUser } =
				snapshotFollowData({ followerId, followingId })
			applyFollowOptimisticUpdate({
				followerId,
				followingId,
				isFollowing: false,
			})
			return { previousFollowingUser, previousFollowerUser }
		},
		onError: async () => {
			if (followerId === null) return null
			options?.removeFollowingOptions?.onError?.(
				options?.removeFollowingOptions?.errorMessage ??
					'erro ao deixar de seguir o usuário'
			)
			await cancelFollowRequests({ followerId, followingId })
			restoreFollowData({ followerId, followingId })
		},
		onSuccess: options?.removeFollowingOptions?.onSuccess,
		onSettled: async () => {
			if (followerId === null) return null
			await refreshFollowData({
				followerId,
				followingId,
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
