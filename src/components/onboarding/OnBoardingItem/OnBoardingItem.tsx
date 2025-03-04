import React, { memo } from 'react'

import {
	Box,
	Container,
	OnBoardingBottomMenu,
	OnBoardingContent,
	OnBoardingHeader,
} from '@/components'

import { OnBoardingItemProps } from './OnBoardingItem.types'

const OnBoardingItemMemoized = ({
	subtitle,
	title,
	image,
}: Readonly<OnBoardingItemProps>) => {
	return (
		<Box
			flex={1}
			backgroundColor="background"
			testID="onboarding-item"
			accessible
		>
			<Box flex={4}>
				<OnBoardingHeader image={image} />
			</Box>
			<Container flex={6}>
				<Box flex={5}>
					<OnBoardingContent subtitle={subtitle} title={title} />
				</Box>
				<Box flex={1}>
					<OnBoardingBottomMenu />
				</Box>
			</Container>
		</Box>
	)
}

export const OnBoardingItem = memo(OnBoardingItemMemoized)
