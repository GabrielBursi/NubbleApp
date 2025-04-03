import React, { memo } from 'react'

import {
	Box,
	Button,
	Icon,
	ProfileAvatar,
	ProfileMetadata,
	Text,
} from '@/components'
import { useNavigationApp } from '@/hooks'

import { ProfileHeaderProps } from './ProfileHeader.types'

const ProfileHeaderMemoized = ({
	user,
	isMyProfile = false,
	postsCount = 0,
}: Readonly<ProfileHeaderProps>) => {
	const { navigationAppStack } = useNavigationApp()

	return (
		<>
			<Box alignItems="center">
				<ProfileAvatar
					imageURL={user?.profileUrl}
					size={100}
					borderRadius={40}
				/>
				<Text preset="headingMedium" mt="s16">
					{user.fullName}
				</Text>
				<Text preset="paragraphLarge" mt="s4" color="gray1">
					{`@${user.username}`}
				</Text>
				<ProfileMetadata
					followersCount={user.meta.followersCount}
					followingCount={user.meta.followingCount}
					postsCount={postsCount}
				/>
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
			<Button title="TO DO" marginVertical="s24" />
		</>
	)
}

export const ProfileHeader = memo(ProfileHeaderMemoized)
