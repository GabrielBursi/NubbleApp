import React from 'react'
import { Text as RNText } from 'react-native'

import { Box, OnBoardingProgressIndicator, Text } from '@/components'

import { OnBoardingContentProps } from './OnBoardingContent.types'

export const OnBoardingContent = ({
	subtitle,
	title,
	index,
	total,
}: Readonly<OnBoardingContentProps>) => {
	return (
		<Box gap="s16">
			<OnBoardingProgressIndicator
				total={total}
				currentIndex={index}
				marginBottom="s24"
			/>
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
