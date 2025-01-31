import React, { useCallback, useState } from 'react'

import { ProfileUsernameList, TextInput } from '@/components'
import { UserModel, useUserSearch } from '@/domain/User'
import { useDebounce } from '@/hooks'
import {
	useSearchHistory,
	useSearchHistoryService,
} from '@/services/searchHistory'
import { ScreenTemplate } from '@/templates'

export const SearchScreen = () => {
	const [search, setSearch] = useState('')
	const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(search)

	const { users: usersSearch, isLoading } = useUserSearch(debouncedSearch)
	const usersHistory = useSearchHistory()
	const { addUser, removeUser } = useSearchHistoryService()

	const handleRemoveUser = useCallback(
		(user: UserModel) => {
			removeUser(user.id)
		},
		[removeUser]
	)

	return (
		<ScreenTemplate
			canGoBack
			HeaderComponent={
				<TextInput.Search
					value={search}
					onChangeText={setSearch}
					placeholder="Procure usuários aqui"
					loading={isLoading || isDebouncing}
				/>
			}
		>
			{search.length ? (
				<ProfileUsernameList onPressProfileItem={addUser} users={usersSearch} />
			) : (
				<ProfileUsernameList
					users={usersHistory}
					headerTitle="Buscas recentes"
					onRemoveProfileItem={handleRemoveUser}
				/>
			)}
		</ScreenTemplate>
	)
}
