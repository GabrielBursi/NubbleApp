import React, { useState } from 'react'

import { ProfileUsernameList, Text, TextInput } from '@/components'
import { useUserSearch } from '@/domain/User'
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
	const { addUser } = useSearchHistoryService()

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
					ListHeaderComponent={
						<Text preset="headingMedium" mb="s16">
							Buscas recentes
						</Text>
					}
				/>
			)}
		</ScreenTemplate>
	)
}
