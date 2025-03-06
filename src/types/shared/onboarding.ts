import { ImageProps } from 'react-native'

type OnBoardingTitle = {
	text: string
	highlight: boolean
}

export type OnboardingPageItem = {
	title: OnBoardingTitle[]
	subtitle: string
	index: number
	total: number
	isLast: boolean
	image: {
		light: Required<ImageProps>['source']
		dark: Required<ImageProps>['source']
	}
}

export type OnboardingPageItemWithoutMeta = Omit<
	OnboardingPageItem,
	'index' | 'total' | 'isLast'
>
