import React from 'react'

import { AppImages } from '@/assets/images'
import { OnBoardingItem } from '@/components'
import { OnBoardingItemProps } from '@/components/onboarding/OnBoardingItem/OnBoardingItem.types'
import { customFaker } from '@/tests/utils/customFaker'

const mockProps: OnBoardingItemProps = {
	subtitle: customFaker.lorem.sentence(),
	title: customFaker.lorem.word(),
	image: {
		dark: AppImages.OnboardingDark1,
		light: AppImages.OnboardingLight1,
	},
}

export const OnBoardingScreen = () => {
	return <OnBoardingItem {...mockProps} />
}
