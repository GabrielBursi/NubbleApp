import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AppQueryKeys } from '@/types/api'
import { MutationOptions } from '@/types/shared'

import { UserApi } from '../../api'
import { UserModel } from '../../models'

export const useUpdateUser = (options?: MutationOptions<UserModel>) => {
	const queryClient = useQueryClient()
	const { mutate, data, reset, isPending, isSuccess } = useMutation({
		mutationFn: UserApi.Update,
		retry: false,
		onError: () => {
			options?.onError?.(options?.errorMessage ?? 'erro ao editar usuário')
		},
		onSuccess: async (user) => {
			await queryClient.invalidateQueries({
				queryKey: [AppQueryKeys.USER_BY_ID, user.id],
			})
			options?.onSuccess?.(user)
		},
	})

	return {
		isPending,
		isSuccess,
		reset,
		update: mutate,
		user: data ?? null,
	} as const
}
