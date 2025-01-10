import { useMutation } from '@tanstack/react-query'

import { AuthApi, AuthCredentialsModel, SignInDataModel } from '@/domain/Auth'
import { useAuthCredentialsService } from '@/services/auth'
import { MutationOptions } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

export const useAuthLogin = (
	options?: StrictOmit<
		MutationOptions<AuthCredentialsModel>,
		'errorMessage' | 'onSuccess'
	>
) => {
	const { saveCredentials } = useAuthCredentialsService()

	const mutation = useMutation({
		mutationFn: (body: SignInDataModel) => AuthApi.Login(body),
		retry: false,
		onSuccess: (data) => saveCredentials(data),
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
