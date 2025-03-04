import React from 'react'

import { AppImages } from '@/assets/images'
import { OnBoardingItem } from '@/components'
import { OnBoardingItemProps } from '@/components/onboarding/OnBoardingItem/OnBoardingItem.types'
import { customFaker } from '@/tests/utils/customFaker'

const mockProps: OnBoardingItemProps = {
	item: {
		subtitle: customFaker.lorem.sentence(),
		title: customFaker.lorem.word(),
		image: {
			dark: AppImages.OnboardingDark1,
			light: AppImages.OnboardingLight1,
		},
	},
	onPressNext: () => console.log('onPressNext'),
	onPressSkip: () => console.log('onPressSkip'),
}

export const OnBoardingScreen = () => {
	return <OnBoardingItem {...mockProps} />
}
