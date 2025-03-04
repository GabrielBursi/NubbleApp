import { OnboardingPageItem } from '@/types/shared'

import { customFaker } from '../utils/customFaker'

export const generateOnBoardingItem = (): OnboardingPageItem => ({
	subtitle: customFaker.lorem.sentence(),
	title: customFaker.lorem.word(),
	image: {
		dark: { uri: customFaker.image.url() },
		light: { uri: customFaker.image.url() },
	},
})
