import { useMutation } from '@tanstack/react-query'

import { MutationOptions } from '@/types/shared'

import { AuthApi } from '../../api'

export const useAuthRequestNewPassword = (
	options?: MutationOptions<string>
) => {
	const { mutate, isPending } = useMutation<string, Error, string>({
		mutationFn: (email) => AuthApi.RequestNewPassword(email),
		retry: false,
		onError: (error) =>
			options?.onError?.(options.errorMessage ?? error.message),
		onSuccess: options?.onSuccess,
	})

	return {
		requestNewPassword: mutate,
		isLoading: isPending,
	} as const
}
