import React, { memo } from 'react'
import { Pressable } from 'react-native'

import { Text } from '@/components'

import { SeeMoreProps } from './SeeMore.types'

const SeeMoreMemoized = ({
	handleExpanded,
	expanded = false,
	textSeeLess = 'Ver menos',
	textSeeMore = 'Ver mais',
	...propsText
}: Readonly<SeeMoreProps>) => {
	return (
		<Pressable onPress={handleExpanded} hitSlop={10} android_disableSound>
			<Text {...propsText} bold color="primary">
				{expanded ? textSeeLess : textSeeMore}
			</Text>
		</Pressable>
	)
}

export const SeeMore = memo(SeeMoreMemoized)
