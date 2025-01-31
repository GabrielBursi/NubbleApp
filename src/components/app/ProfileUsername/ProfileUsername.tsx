import React, { memo } from 'react'
import { GestureResponderEvent } from 'react-native'

import { PressableBox, ProfileAvatar, Text } from '@/components'
import { useNavigationApp } from '@/hooks'

import { ProfileUsernameProps } from './ProfileUsername.types'

const ProfileUsernameMemoized = ({
	profileUrl,
	username,
	id,
	onPress,
	...pressableBoxProps
}: Readonly<ProfileUsernameProps>) => {
	const { navigationAppStack } = useNavigationApp()

	const handleOnPress = (event: GestureResponderEvent) => {
		onPress?.(event)
		navigationAppStack.navigate('ProfileScreen', { userId: id })
	}

	return (
		<PressableBox
			flexDirection="row"
			alignItems="center"
			mb="s16"
			role="button"
			accessibilityRole="button"
			accessible
			accessibilityLabel={username}
			accessibilityHint={`ir para o perfil de usuário ${username}`}
			onPress={handleOnPress}
			{...pressableBoxProps}
		>
			<ProfileAvatar imageURL={profileUrl} />
			<Text ml="s12" semiBold preset="paragraphMedium">
				{username}
			</Text>
		</PressableBox>
	)
}

export const ProfileUsername = memo(ProfileUsernameMemoized)
