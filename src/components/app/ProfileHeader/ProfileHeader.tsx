import React, { memo } from 'react'

import { Box, ProfileAvatar, ProfileMetadata, Text } from '@/components'

import { ProfileHeaderProps } from './ProfileHeader.types'

const ProfileHeaderMemoized = ({ user }: Readonly<ProfileHeaderProps>) => {
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
		</Box>
	)
}

export const ProfileHeader = memo(ProfileHeaderMemoized)
