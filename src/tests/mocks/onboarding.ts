import { OnboardingPageItem } from '@/types/shared'

import { customFaker } from '../utils/customFaker'

export const generateOnBoardingItem = (): OnboardingPageItem => ({
	subtitle: customFaker.lorem.sentence(),
	title: [
		{ text: `${customFaker.lorem.words()} `, highlight: false },
		{ text: customFaker.lorem.word(), highlight: true },
	],
	image: {
		dark: { uri: customFaker.image.url() },
		light: { uri: customFaker.image.url() },
	},
	index: customFaker.number.int({ min: 0, max: 10 }),
	isLast: customFaker.datatype.boolean(),
	total: customFaker.number.int({ min: 1, max: 20 }),
})
