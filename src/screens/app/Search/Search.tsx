import React from 'react'

import { Icon, Text, TextInput } from '@/components'
import { ScreenTemplate } from '@/templates'

export const SearchScreen = () => {
	return (
		<ScreenTemplate
			canGoBack
			HeaderComponent={
				<TextInput
					placeholder="Procure usuários aqui"
					boxProps={{ style: { marginBottom: 0 } }}
					LeftComponent={<Icon color="gray3" name="search" />}
				/>
			}
		>
			<Text>SearchScreen</Text>
		</ScreenTemplate>
	)
}
