import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootAuthStackRouterParamList } from '@/types/routes'

export type AuthScreenProps<
	TScreen extends keyof RootAuthStackRouterParamList,
> = NativeStackScreenProps<RootAuthStackRouterParamList, TScreen>
