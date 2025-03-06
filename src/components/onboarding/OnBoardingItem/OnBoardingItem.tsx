import React, { memo } from 'react'
import { Dimensions } from 'react-native'

import {
	Box,
	Container,
	OnBoardingBottomMenu,
	OnBoardingContent,
	OnBoardingHeader,
} from '@/components'

import { OnBoardingItemProps } from './OnBoardingItem.types'

const SCREEN_WIDTH = Dimensions.get('screen').width

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
			role="listitem"
			width={SCREEN_WIDTH}
			gap="s8"
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
