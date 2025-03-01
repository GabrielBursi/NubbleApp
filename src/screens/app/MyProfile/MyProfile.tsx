import React from 'react'

import { Button } from '@/components'
import { ScreenTemplate } from '@/templates'
import { MyProfileScreenProps } from '@/types/screens'

export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
	return (
		<ScreenTemplate>
			<Button
				title="Configurações"
				onPress={() => navigation.navigate('SettingsScreen')}
			/>
		</ScreenTemplate>
	)
}
