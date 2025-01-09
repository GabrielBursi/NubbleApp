import Config from 'react-native-config'

import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from './models'
import {
	useAuthCredentialsZustand,
	useAuthCredentialsServiceZustand,
	useAuthCredentialsContext,
	useAuthCredentialsServiceContext,
} from './store'

export const useAuthCredentials: () => AuthCredentialsService['authCredentials'] =
	Number(Config.USE_CONTEXT_SERVICE)
		? useAuthCredentialsContext
		: useAuthCredentialsZustand
export const useAuthCredentialsService: () => StrictOmit<
	AuthCredentialsService,
	'authCredentials'
> = Number(Config.USE_CONTEXT_SERVICE)
	? useAuthCredentialsServiceContext
	: useAuthCredentialsServiceZustand
