import { NavigationProp, useNavigation } from '@react-navigation/native'

import {
	RootAppStackRouterParamList,
	RootAuthStackRouterParamList,
} from '@/types/routes'

export const useNavigationApp = () => {
	const navigationAppStack =
		useNavigation<NavigationProp<RootAppStackRouterParamList>>()

	const navigationAuthStack =
		useNavigation<NavigationProp<RootAuthStackRouterParamList>>()

	return {
		navigationAppStack,
		navigationAuthStack,
	} as const
}
