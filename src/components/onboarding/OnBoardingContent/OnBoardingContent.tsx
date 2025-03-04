import React from 'react'

import { Box, Text } from '@/components'

import { OnBoardingContentProps } from './OnBoardingContent.types'

export const OnBoardingContent = ({
	subtitle,
	title,
}: Readonly<OnBoardingContentProps>) => {
	return (
		<Box>
			<Text preset="headingLarge">{title}</Text>
			<Text preset="paragraphLarge">{subtitle}</Text>
		</Box>
	)
}
