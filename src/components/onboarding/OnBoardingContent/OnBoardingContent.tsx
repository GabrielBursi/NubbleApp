import React from 'react'
import { Text as RNText } from 'react-native'

import { Box, Text } from '@/components'

import { OnBoardingContentProps } from './OnBoardingContent.types'

export const OnBoardingContent = ({
	subtitle,
	title,
}: Readonly<OnBoardingContentProps>) => {
	return (
		<Box>
			<RNText accessible={false} role="heading">
				{title.map((text, index) => (
					<Text
						key={`${text.text}-${index}`}
						preset="headingLarge"
						color={text.highlight ? 'carrotSecondary' : 'backgroundContrast'}
					>
						{text.text}
					</Text>
				))}
			</RNText>
			<Text preset="paragraphLarge">{subtitle}</Text>
		</Box>
	)
}
