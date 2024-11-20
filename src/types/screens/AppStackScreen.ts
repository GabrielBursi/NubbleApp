import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootAppStackRouterParamList } from '@/types/routes'

export type AppScreenProps<TScreen extends keyof RootAppStackRouterParamList> =
	NativeStackScreenProps<RootAppStackRouterParamList, TScreen>
