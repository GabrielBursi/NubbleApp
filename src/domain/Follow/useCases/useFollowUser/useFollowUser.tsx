import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserDetailsModel, UserModel } from '@/domain/User'
import { useAuthCredentials } from '@/services/auth'
import { AppQueryKeys } from '@/types/api'
import { MutationOptions } from '@/types/shared'

import { FollowApi } from '../../api'

export const useFollowUser = (options?: MutationOptions<UserModel>) => {
	const queryClient = useQueryClient()
	const ac = useAuthCredentials()

	const cancelUsersQueries = useCallback(
		async (followingId?: UserModel['id'], followerId?: UserModel['id']) => {
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

	const { mutate, isPending, data, error, isSuccess, reset, context } =
		useMutation({
			mutationFn: FollowApi.FollowUser,
			onMutate: async (followingId) => {
				await cancelUsersQueries(followingId, ac?.user.id)

				const previousFollowingUserData =
					queryClient.getQueryData<UserDetailsModel>([
						AppQueryKeys.USER_BY_ID,
						followingId,
					])
				const previousFollowerUserData =
					queryClient.getQueryData<UserDetailsModel>([
						AppQueryKeys.USER_BY_ID,
						ac?.user.id,
					])

				queryClient.setQueryData(
					[AppQueryKeys.USER_BY_ID, followingId],
					(old: UserDetailsModel): UserDetailsModel => {
						if (!old) return old
						return {
							...old,
							isFollowing: true,
							meta: {
								...old.meta,
								followersCount: old.meta.followersCount + 1,
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
								followingCount: old.meta.followingCount + 1,
							},
						}
					}
				)

				return { previousFollowingUserData, previousFollowerUserData }
			},
			onError: async (_err, followingId, context) => {
				options?.onError?.(options?.errorMessage ?? 'erro ao seguir usuário')

				await cancelUsersQueries(followingId, ac?.user.id)

				queryClient.setQueryData(
					[AppQueryKeys.USER_BY_ID, followingId],
					context?.previousFollowingUserData
				)
				queryClient.setQueryData(
					[AppQueryKeys.USER_BY_ID, ac?.user.id],
					context?.previousFollowerUserData
				)
			},
			onSuccess: options?.onSuccess,
			onSettled: async (followingUser) => {
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
					}),
					queryClient.invalidateQueries({
						queryKey: [AppQueryKeys.USER_BY_ID, followingUser?.id],
					}),
					queryClient.invalidateQueries({
						queryKey: [AppQueryKeys.USER_BY_ID, ac?.user.id],
					}),
				])
			},
		})

	return {
		followUser: mutate,
		isLoading: isPending,
		followingUser: data ?? null,
		error,
		isSuccess,
		reset,
		followContext: context ?? null,
	} as const
}
