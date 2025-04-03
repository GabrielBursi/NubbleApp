import React, { memo, useMemo } from 'react'

import { Box, Text } from '@/components'

import { ProfileMetadataProps } from './ProfileMetadata.types'

type ItemType = {
	value: number
	label: string
}

const Item = ({ value, label }: ItemType) => {
	return (
		<Box key={label} alignItems="center">
			<Text preset="headingSmall">{value.toString()}</Text>
			<Text preset="paragraphSmall">{label}</Text>
		</Box>
	)
}

const ProfileMetadataMemoized = ({
	followersCount = 0,
	followingCount = 0,
	postsCount = 0,
}: Readonly<ProfileMetadataProps>) => {
	const items: ItemType[] = useMemo(
		() => [
			{ label: 'Publicações', value: postsCount },
			{ label: 'Seguidores', value: followersCount },
			{ label: 'Seguindo', value: followingCount },
		],
		[followersCount, followingCount, postsCount]
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
