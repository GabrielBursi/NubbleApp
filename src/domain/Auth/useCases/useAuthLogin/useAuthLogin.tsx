import { useMutation } from '@tanstack/react-query'

import {
	AuthApi,
	AuthCredentialsModel,
	PayloadLogin,
	useAuthToken,
} from '@/domain/Auth'
import { MutationOptions } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

export const useAuthLogin = (
	options?: StrictOmit<
		MutationOptions<AuthCredentialsModel>,
		'errorMessage' | 'onSuccess'
	>
) => {
	const { updateToken } = useAuthToken()

	const mutation = useMutation({
		mutationFn: (body: PayloadLogin) => AuthApi.Login(body),
		retry: false,
		onSuccess: (data) => {
			updateToken(data.token)
		},
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
