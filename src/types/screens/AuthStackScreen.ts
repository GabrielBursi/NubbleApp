import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootAuthStackRouterParamList } from '@/types/routes'

export type AuthStackScreenProps<
	TScreen extends keyof RootAuthStackRouterParamList,
> = NativeStackScreenProps<RootAuthStackRouterParamList, TScreen>
