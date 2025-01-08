import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from './models'
import {
	useAuthCredentialsZustand,
	useAuthCredentialsServiceZustand,
} from './store'

export const useAuthCredentials =
	(): AuthCredentialsService['authCredentials'] => useAuthCredentialsZustand()
export const useAuthCredentialsService = (): StrictOmit<
	AuthCredentialsService,
	'authCredentials'
> => useAuthCredentialsServiceZustand()
