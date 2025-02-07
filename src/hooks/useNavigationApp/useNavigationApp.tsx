import { NavigationProp, useNavigation } from '@react-navigation/native'

import {
	RootAppStackRouterParamList,
	RootAppTabBottomRouterParamList,
	RootAuthStackRouterParamList,
} from '@/types/routes'

export const useNavigationApp = () => {
	const navigationAppStack =
		useNavigation<NavigationProp<RootAppStackRouterParamList>>()

	const navigationAppTab =
		useNavigation<NavigationProp<RootAppTabBottomRouterParamList>>()

	const navigationAuthStack =
		useNavigation<NavigationProp<RootAuthStackRouterParamList>>()

	return {
		navigationAppStack,
		navigationAuthStack,
		navigationAppTab,
	} as const
}
