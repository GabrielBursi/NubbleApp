import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import {
	RootAppStackRouterParamList,
	RootAppTabBottomRouterParamList,
} from '../routes'

export type AppTabBottomScreenProp<
	RouteName extends keyof RootAppTabBottomRouterParamList,
> = CompositeScreenProps<
	BottomTabScreenProps<RootAppTabBottomRouterParamList, RouteName>,
	NativeStackScreenProps<RootAppStackRouterParamList, 'AppTabNavigator'>
>
