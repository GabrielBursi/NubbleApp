import { usePaginatedList } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

import { UserApi } from '../../api'

export const useUserSearch = (search: string) => {
	const {
		list: users,
		refreshList: refreshUsers,
		...restData
	} = usePaginatedList(() => UserApi.GetAllWithSearch(search), {
		queryKey: [AppQueryKeys.USERS, search],
		staleTime: 3 * 10 * 1000,
		gcTime: 1 * 10 * 1000,
		enabled: !!search.trim().length,
	})

	return {
		users: search.trim().length ? users : [],
		refreshUsers,
		...restData,
	} as const
}
