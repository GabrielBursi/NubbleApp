import { useMutation } from '@tanstack/react-query'

import { AuthApi, PayloadLogin } from '@/domain/Auth'
//TODO:  add options nos hooks
export const useAuthLogin = () => {
	const mutation = useMutation({
		mutationFn: (body: PayloadLogin) => AuthApi.Login(body),
		retry: false,
	})

	console.log(mutation.data)

	return {
		isLoading: mutation.isPending,
		login: mutation.mutate,
		authCredentials: mutation.data ?? null,
	} as const
}
