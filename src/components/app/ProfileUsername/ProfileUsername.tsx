import React, { memo } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Box, PressableBox, ProfileAvatar, Text } from '@/components'
import { useAppNavigation } from '@/hooks'

import { ProfileUsernameProps } from './ProfileUsername.types'

const ProfileUsernameMemoized = ({
	profileUrl,
	username,
	id,
	onPress,
	avatarProps,
	RightComponent,
	...pressableBoxProps
}: Readonly<ProfileUsernameProps>) => {
	const { navigationAppStack } = useAppNavigation()

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
			justifyContent="space-between"
			accessible
			accessibilityLabel={username}
			accessibilityHint={`ir para o perfil de usuário ${username}`}
			onPress={handleOnPress}
			{...pressableBoxProps}
		>
			<Box flexDirection="row" alignItems="center">
				<ProfileAvatar {...avatarProps} authorId={id} imageURL={profileUrl} />
				<Text ml="s12" semiBold preset="paragraphMedium">
					{username}
				</Text>
			</Box>
			{RightComponent}
		</PressableBox>
	)
}

export const ProfileUsername = memo(ProfileUsernameMemoized)
