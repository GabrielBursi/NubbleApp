import { useMutation } from '@tanstack/react-query'

import { AuthApi, useAuthToken } from '@/domain/Auth'
import { useAuthCredentialsService } from '@/services/auth'

export const useAuthLogout = () => {
	const { removeCredentials } = useAuthCredentialsService()
	const { removeToken } = useAuthToken()

	const mutation = useMutation({
		mutationFn: AuthApi.Logout,
		retry: false,
		onSuccess: async () => {
			removeToken()
			await removeCredentials()
		},
	})

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending,
		message: mutation.data ?? null,
	} as const
}
