import React from 'react'
import { Dimensions, Image } from 'react-native'

import { useAppThemeOption } from '@/services/settings'

import { OnBoardingHeaderProps } from './OnBoardingHeader.types'

const SCREEN_WIDTH = Dimensions.get('screen').width

export const OnBoardingHeader = ({
	image,
}: Readonly<OnBoardingHeaderProps>) => {
	const appColor = useAppThemeOption()

	const source = appColor === 'light' ? image.light : image.dark

	return (
		<Image
			source={source}
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ width: SCREEN_WIDTH, height: '100%' }}
			role="img"
			accessible
		/>
	)
}
