import { ImageProps } from 'react-native'

type OnBoardingTitle = {
	text: string
	highlight: boolean
}

export type OnboardingPageItem = {
	title: OnBoardingTitle[]
	subtitle: string
	image: {
		light: Required<ImageProps>['source']
		dark: Required<ImageProps>['source']
	}
}
