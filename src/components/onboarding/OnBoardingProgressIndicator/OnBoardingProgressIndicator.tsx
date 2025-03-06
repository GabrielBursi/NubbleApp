import React from 'react'

import { Box } from '@/components'

import { OnBoardingProgressIndicatorProps } from './OnBoardingProgressIndicator.types'

export const OnBoardingProgressIndicator = ({
	currentIndex,
	total,
	...boxProps
}: Readonly<OnBoardingProgressIndicatorProps>) => {
	return (
		<Box
			flexDirection="row"
			gap="s12"
			alignItems="center"
			{...boxProps}
			role="list"
			accessible
		>
			{Array.from({ length: total }).map((_, index) => (
				<Box
					// eslint-disable-next-line sonarjs/no-array-index-key
					key={index}
					width={index === currentIndex ? 14 : 8}
					height={index === currentIndex ? 14 : 8}
					borderRadius="s12"
					accessibilityState={{
						selected: index === currentIndex,
					}}
					backgroundColor={index === currentIndex ? 'carrotSecondary' : 'gray2'}
					role="listitem"
					accessibilityLabel={`${index}`}
					accessible
				/>
			))}
		</Box>
	)
}
