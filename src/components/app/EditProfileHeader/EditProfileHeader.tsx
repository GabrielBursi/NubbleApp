import React, { memo } from 'react'
import { Pressable } from 'react-native'

import { Box, ProfileAvatar, Text } from '@/components'

import { EditProfileHeaderProps } from './EditProfileHeader.types'

const EditProfileHeaderMemoized = ({
	user,
}: Readonly<EditProfileHeaderProps>) => {
	return (
		<Box flexDirection="row" alignItems="center">
			<ProfileAvatar imageURL={user.profileUrl} size={64} borderRadius={24} />
			<Pressable hitSlop={12}>
				<Text preset="paragraphMedium" color="primary" bold ml="s16">
					Alterar foto
				</Text>
			</Pressable>
		</Box>
	)
}

export const EditProfileHeader = memo(EditProfileHeaderMemoized)
