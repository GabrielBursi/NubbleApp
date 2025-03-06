import React from 'react'

import { Box, Icon, PressableBox, Text } from '@/components'

import { OnBoardingBottomMenuProps } from './OnBoardingBottomMenu.types'

export const OnBoardingBottomMenu = ({
	onPressNext,
	onPressSkip,
	isLast,
}: Readonly<OnBoardingBottomMenuProps>) => {
	return (
		<Box flexDirection="row" justifyContent="space-between">
			<PressableBox hitSlop={10} onPress={onPressSkip}>
				<Text semiBold color="gray2">
					Pular
				</Text>
			</PressableBox>
			<PressableBox
				hitSlop={10}
				onPress={onPressNext}
				flexDirection="row"
				alignItems="center"
			>
				<Text bold mr="s4">
					{isLast ? 'Começar' : 'Próximo'}
				</Text>
				<Icon name="arrowRight" color="carrotSecondary" />
			</PressableBox>
		</Box>
	)
}
