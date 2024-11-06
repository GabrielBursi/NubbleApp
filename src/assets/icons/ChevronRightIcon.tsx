import React from 'react'

import { Svg, Path } from 'react-native-svg'

import { IconBase } from '@/types/theme'

export function ChevronRightIcon({
	size = 20,
	color = 'black',
}: Readonly<IconBase>) {
	return (
		<Svg
			accessibilityRole="image"
			role="img"
			accessible
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
		>
			<Path
				d="M7 4L14 10L7 16"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}
