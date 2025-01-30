import React, { memo } from 'react'

import { Box, ProfileAvatar, Text } from '@/components'

import { ProfileUsernameProps } from './ProfileUsername.types'

const ProfileUsernameMemoized = ({
	profileUrl,
	username,
}: Readonly<ProfileUsernameProps>) => {
	return (
		<Box flexDirection="row" alignItems="center" mb="s16" gap="s12">
			<ProfileAvatar
				aria-label={username}
				accessibilityLabel={username}
				imageURL={profileUrl}
			/>
			<Text semiBold preset="paragraphMedium">
				{username}
			</Text>
		</Box>
	)
}

export const ProfileUsername = memo(ProfileUsernameMemoized)
