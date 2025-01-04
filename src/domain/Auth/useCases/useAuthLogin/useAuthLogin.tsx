import { useMutation } from '@tanstack/react-query'

import { AuthApi, AuthCredentialsModel, PayloadLogin } from '@/domain/Auth'
import { MutationOptions } from '@/types/shared'
//TODO:  add options nos hooks
export const useAuthLogin = (
	options?: MutationOptions<AuthCredentialsModel>
) => {
	const mutation = useMutation({
		mutationFn: (body: PayloadLogin) => AuthApi.Login(body),
		retry: false,
		onSuccess: options?.onSuccess,
		onError: (error) => {
			if (options?.onError) {
				options.onError(error.message)
			}
		},
	})

	return {
		isLoading: mutation.isPending,
		login: mutation.mutate,
		authCredentials: mutation.data ?? null,
	} as const
}
