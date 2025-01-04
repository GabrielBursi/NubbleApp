import { useMutation } from '@tanstack/react-query'

import { AuthApi } from '@/domain/Auth'

export const useAuthLogout = () => {
	const mutation = useMutation({
		mutationFn: AuthApi.Logout,
		retry: false,
	})

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending,
		message: mutation.data ?? null,
	} as const
}
