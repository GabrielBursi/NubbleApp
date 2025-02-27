import React, { useCallback, useState } from 'react'

import { Box, ProfileUsernameList, TextInput } from '@/components'
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
				<Box ml="s10" flex={1}>
					<TextInput.Search
						value={search}
						onChangeText={setSearch}
						placeholder="Procure usuários aqui"
						loading={isLoading || isDebouncing}
					/>
				</Box>
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
