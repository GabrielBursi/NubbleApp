import { useMutation } from '@tanstack/react-query'

import { AuthApi, AuthCredentialsModel, PayloadLogin } from '@/domain/Auth'
import { MutationOptions } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

export const useAuthLogin = (
	options?: StrictOmit<MutationOptions<AuthCredentialsModel>, 'errorMessage'>
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
