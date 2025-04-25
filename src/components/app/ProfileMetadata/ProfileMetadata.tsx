import React, { memo, useMemo } from 'react'

import { Box, PressableBox, Text } from '@/components'
import { useAppNavigation } from '@/hooks'

import { ProfileMetadataProps } from './ProfileMetadata.types'

type ItemType = {
	value: number
	label: string
	onPress?: () => void
	isMyProfile?: boolean
}

const Item = ({ value, label, isMyProfile, onPress }: ItemType) => {
	return (
		<PressableBox onPress={onPress} alignItems="center" disabled={!isMyProfile}>
			<Text preset="headingSmall">{value.toString()}</Text>
			<Text preset="paragraphSmall">{label}</Text>
		</PressableBox>
	)
}

const ProfileMetadataMemoized = ({
	followersCount = 0,
	followingCount = 0,
	postsCount = 0,
	isMyProfile = false,
}: Readonly<ProfileMetadataProps>) => {
	const { navigationAppStack } = useAppNavigation()

	const items: ItemType[] = useMemo(
		() => [
			{ label: 'Publicações', value: postsCount, isMyProfile },
			{
				label: 'Seguidores',
				value: followersCount,
				isMyProfile,
				onPress: () => navigationAppStack.navigate('MyFollowersScreen'),
			},
			{
				label: 'Seguindo',
				value: followingCount,
				isMyProfile,
				onPress: () => navigationAppStack.navigate('MyFollowingScreen'),
			},
		],
		[
			followersCount,
			followingCount,
			isMyProfile,
			navigationAppStack,
			postsCount,
		]
	)

	return (
		<Box
			flexDirection="row"
			justifyContent="space-between"
			mt="s24"
			columnGap="s32"
		>
			{items.map((item) => (
				<Item {...item} key={item.label} />
			))}
		</Box>
	)
}

export const ProfileMetadata = memo(ProfileMetadataMemoized)
