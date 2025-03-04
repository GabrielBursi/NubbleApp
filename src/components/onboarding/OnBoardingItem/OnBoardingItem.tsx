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
	item,
	onPressNext,
	onPressSkip,
}: Readonly<OnBoardingItemProps>) => {
	return (
		<Box
			flex={1}
			backgroundColor="background"
			testID="onboarding-item"
			accessible
		>
			<Box flex={4}>
				<OnBoardingHeader image={item.image} />
			</Box>
			<Container flex={6}>
				<Box flex={5}>
					<OnBoardingContent subtitle={item.subtitle} title={item.title} />
				</Box>
				<Box flex={1}>
					<OnBoardingBottomMenu
						onPressNext={onPressNext}
						onPressSkip={onPressSkip}
					/>
				</Box>
			</Container>
		</Box>
	)
}

export const OnBoardingItem = memo(OnBoardingItemMemoized)
