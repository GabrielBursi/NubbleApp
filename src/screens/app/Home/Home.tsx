import React from 'react'

import { Button } from '@/components'
import { ScreenTemplate } from '@/templates'
import { HomeScreenProps } from '@/types/screens'

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
	return (
		<ScreenTemplate>
			<Button
				title="FavoriteScreen"
				onPress={() => navigation.navigate('FavoriteScreen')}
				mb="s14"
			/>
			<Button
				title="MyProfileScreen"
				onPress={() => navigation.navigate('MyProfileScreen')}
				mb="s14"
			/>
			<Button
				title="NewPostScreen"
				onPress={() => navigation.navigate('NewPostScreen')}
				mb="s14"
			/>
			<Button
				title="SettingsScreen"
				onPress={() => navigation.navigate('SettingsScreen')}
				mb="s14"
			/>
		</ScreenTemplate>
	)
}
