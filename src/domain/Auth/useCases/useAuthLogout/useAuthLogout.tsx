import { useMutation } from '@tanstack/react-query'

import { AuthApi } from '@/domain/Auth'
import { useAuthCredentialsService } from '@/services/auth'
import { useSearchHistoryService } from '@/services/searchHistory'

export const useAuthLogout = () => {
	const { removeCredentials } = useAuthCredentialsService()
	const { clearUserList } = useSearchHistoryService()

	const mutation = useMutation({
		mutationFn: AuthApi.Logout,
		retry: false,
		onSettled: async () => {
			await removeCredentials()
			clearUserList()
		},
	})

	return {
		logout: mutation.mutate,
		isLoading: mutation.isPending,
		message: mutation.data ?? null,
	} as const
}
