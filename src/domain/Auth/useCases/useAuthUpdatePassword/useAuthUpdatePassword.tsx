import { useMutation } from '@tanstack/react-query'

import { MutationOptions } from '@/types/shared'

import { AuthApi } from '../../api'

export const useAuthUpdatePassword = (options?: MutationOptions<string>) => {
	const { mutate, data, isPending } = useMutation({
		mutationFn: AuthApi.ChangePassword,
		retry: false,
		onSuccess: options?.onSuccess,
		onError: () => {
			options?.onError?.(
				options.errorMessage ?? 'Houve um erro ao atualizar a senha'
			)
		},
	})

	return {
		updatePassword: mutate,
		successMessage: data ?? null,
		isLoading: isPending,
	} as const
}
