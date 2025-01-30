import React, { useState } from 'react'

import { Icon, Text, TextInput } from '@/components'
import { useUserSearch } from '@/domain/User'
import { useDebounce } from '@/hooks'
import { ScreenTemplate } from '@/templates'

export const SearchScreen = () => {
	const [search, setSearch] = useState('')
	const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(search)

	const { users, isLoading } = useUserSearch(debouncedSearch)

	return (
		<ScreenTemplate
			canGoBack
			HeaderComponent={
				<TextInput
					value={search}
					onChangeText={setSearch}
					placeholder="Procure usuários aqui"
					boxProps={{ style: { marginBottom: 0 } }}
					LeftComponent={<Icon color="gray3" name="search" />}
					loading={isLoading || isDebouncing}
				/>
			}
		>
			{users.map((user, index) => (
				<Text key={`${user.id}-${index}`}>{user.username}</Text>
			))}
		</ScreenTemplate>
	)
}
