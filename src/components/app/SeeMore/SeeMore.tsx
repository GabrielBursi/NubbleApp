import React, { memo } from 'react'
import { Pressable } from 'react-native'

import { Text } from '@/components'

import { SeeMoreProps } from './SeeMore.types'

const SeeMoreMemoized = ({ onClickSeeMore }: Readonly<SeeMoreProps>) => {
	return (
		<Pressable onPress={onClickSeeMore}>
			<Text bold color="primary" textAlign="center">
				Ver mais
			</Text>
		</Pressable>
	)
}

export const SeeMore = memo(SeeMoreMemoized)
