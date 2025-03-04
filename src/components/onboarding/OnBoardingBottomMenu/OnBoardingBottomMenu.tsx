import React from 'react'

import { Box, Icon, PressableBox, Text } from '@/components'

import { OnBoardingBottomMenuProps } from './OnBoardingBottomMenu.types'

export const OnBoardingBottomMenu = ({
	onPressNext,
	onPressSkip,
}: Readonly<OnBoardingBottomMenuProps>) => {
	return (
		<Box flexDirection="row" justifyContent="space-between">
			<PressableBox hitSlop={10} onPress={onPressSkip}>
				<Text>Pular</Text>
			</PressableBox>
			<PressableBox
				hitSlop={10}
				onPress={onPressNext}
				flexDirection="row"
				alignItems="center"
			>
				<Text mr="s4">Próximo</Text>
				<Icon name="arrowRight" />
			</PressableBox>
		</Box>
	)
}
