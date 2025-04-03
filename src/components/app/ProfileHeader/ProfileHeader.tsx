import React, { memo } from 'react'

import { Box, Icon, ProfileAvatar, ProfileMetadata, Text } from '@/components'
import { useNavigationApp } from '@/hooks'

import { ProfileHeaderProps } from './ProfileHeader.types'

const ProfileHeaderMemoized = ({
	user,
	isMyProfile = false,
}: Readonly<ProfileHeaderProps>) => {
	const { navigationAppStack } = useNavigationApp()

	return (
		<Box alignItems="center">
			<ProfileAvatar imageURL={user?.profileUrl} size={100} borderRadius={40} />
			<Text preset="headingMedium" mt="s16">
				{user.fullName}
			</Text>
			<Text preset="paragraphLarge" mt="s4" color="gray1">
				{`@${user.username}`}
			</Text>
			<ProfileMetadata followersCount={1} followingCount={2} postsCount={3} />
			{isMyProfile && (
				<Box position="absolute" alignSelf="flex-end">
					<Icon
						size={30}
						name="settings"
						onPress={() => navigationAppStack.navigate('SettingsScreen')}
					/>
				</Box>
			)}
		</Box>
	)
}

export const ProfileHeader = memo(ProfileHeaderMemoized)
