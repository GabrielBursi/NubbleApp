import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserDetailsModel, UserModel } from '@/domain/User'
import { useAuthCredentials } from '@/services/auth'
import { AppQueryKeys } from '@/types/api'
import { MutationOptions } from '@/types/shared'

import { FollowApi } from '../../api'
import { useFollowUser } from '../useFollowUser/useFollowUser'

export const useRemoveFollow = (
	followId: UserModel['id'],
	options?: MutationOptions<void>
) => {
	const queryClient = useQueryClient()
	const { followUser, isLoading: isUndoingRemoveFollow } = useFollowUser()
	const ac = useAuthCredentials()

	const cancelUsersQueries = useCallback(
		async (
			removeFollowingId?: UserModel['id'],
			followerId?: UserModel['id']
		) => {
			await Promise.allSettled([
				queryClient.cancelQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, removeFollowingId],
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

	const { mutate, isPending, error, isSuccess, reset, context } = useMutation({
		mutationFn: () => FollowApi.RemoveFollow(followId),
		onMutate: async () => {
			await cancelUsersQueries(followId, ac?.user.id)

			const previousFollowingUserData =
				queryClient.getQueryData<UserDetailsModel>([
					AppQueryKeys.USER_BY_ID,
					followId,
				])
			const previousFollowerUserData =
				queryClient.getQueryData<UserDetailsModel>([
					AppQueryKeys.USER_BY_ID,
					ac?.user.id,
				])

			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, followId],
				(old: UserDetailsModel): UserDetailsModel => {
					if (!old) return old
					return {
						...old,
						isFollowing: false,
						meta: {
							...old.meta,
							followersCount: old.meta.followersCount - 1,
						},
					}
				}
			)

			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, ac?.user.id],
				(old: UserDetailsModel): UserDetailsModel => {
					if (!old) return old
					return {
						...old,
						meta: {
							...old.meta,
							followingCount: old.meta.followingCount - 1,
						},
					}
				}
			)

			return { previousFollowingUserData, previousFollowerUserData }
		},
		onError: async (_err, _variables, context) => {
			options?.onError?.(options?.errorMessage ?? 'erro ao deixar de seguir')

			await cancelUsersQueries(followId, ac?.user.id)

			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, followId],
				context?.previousFollowingUserData
			)
			queryClient.setQueryData(
				[AppQueryKeys.USER_BY_ID, ac?.user.id],
				context?.previousFollowerUserData
			)
		},
		onSuccess: options?.onSuccess,
		onSettled: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
				}),
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, followId],
				}),
				queryClient.invalidateQueries({
					queryKey: [AppQueryKeys.USER_BY_ID, ac?.user.id],
				}),
			])
		},
	})

	const undoRemoveFollow = useCallback(() => {
		followUser(followId)
	}, [followUser, followId])

	return {
		removeFollow: mutate,
		undoRemoveFollow,
		isLoading: isPending,
		isUndoingRemoveFollow,
		error,
		isSuccess,
		reset,
		removeFollowContext: context ?? null,
	} as const
}
