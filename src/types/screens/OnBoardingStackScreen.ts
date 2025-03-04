import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { OnboardingStackParamList } from '../routes'

export type OnboardingScreenProps<
	TScreen extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, TScreen>
