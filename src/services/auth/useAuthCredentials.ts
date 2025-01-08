import { StrictOmit } from '@/types/utils'

import { AuthCredentialsServiceWithoutPromise } from './models'
import {
	useAuthCredentialsZustand,
	useAuthCredentialsServiceZustand,
} from './store'

export const useAuthCredentials =
	(): AuthCredentialsServiceWithoutPromise['authCredentials'] =>
		useAuthCredentialsZustand()
export const useAuthCredentialsService = (): StrictOmit<
	AuthCredentialsServiceWithoutPromise,
	'authCredentials'
> => useAuthCredentialsServiceZustand()
