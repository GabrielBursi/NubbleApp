import { useMutation } from '@tanstack/react-query'

import { AuthApi, SignUpDataModel } from '@/domain/Auth'
import { MutationOptions } from '@/types/shared'

export const useAuthSignUp = (options?: MutationOptions<void>) => {
	const mutation = useMutation({
		mutationFn: (signUpData: SignUpDataModel) => AuthApi.SignUp(signUpData),
		retry: false,
		onSuccess: options?.onSuccess,
		onError: (error) => {
			options?.onError?.(options.errorMessage ?? error.message)
		},
	})

	return {
		isLoading: mutation.isPending,
		signUp: mutation.mutate,
	} as const
}
