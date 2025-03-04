import { ImageProps } from 'react-native'

export type OnboardingPageItem = {
	title: string
	subtitle: string
	image: {
		light: Required<ImageProps>['source']
		dark: Required<ImageProps>['source']
	}
}
