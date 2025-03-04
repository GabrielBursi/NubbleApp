import React from 'react'
import { Dimensions, Image } from 'react-native'

import { AppImages } from '@/assets/images'

const SCREEN_WIDTH = Dimensions.get('screen').width

export const OnBoardingHeader = () => {
	return (
		<Image
			source={AppImages.OnboardingDark1}
			style={{ width: SCREEN_WIDTH }}
			role="img"
			accessible
		/>
	)
}
