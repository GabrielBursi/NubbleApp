import React, { useState } from 'react'

import { ProfileUsernameList, Text, TextInput } from '@/components'
import { useUserSearch } from '@/domain/User'
import { useDebounce } from '@/hooks'
import { useSearchHistory } from '@/services/searchHistory'
import { ScreenTemplate } from '@/templates'

export const SearchScreen = () => {
	const [search, setSearch] = useState('')
	const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(search)

	const { users: usersSearch, isLoading } = useUserSearch(debouncedSearch)
	const usersHistory = useSearchHistory()

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
				<ProfileUsernameList users={usersSearch} />
			) : (
				<ProfileUsernameList
					users={usersHistory}
					ListHeaderComponent={
						<Text preset="headingMedium">Buscas recentes</Text>
					}
				/>
			)}
		</ScreenTemplate>
	)
}
