import { StrictOmit } from '@/types/utils'

import { ToastService } from './models'
import { useToastServiceZustand, useToastZustand } from './store'

export const useToast = (): ToastService['toast'] => useToastZustand()
export const useToastService = (): StrictOmit<ToastService, 'toast'> =>
	useToastServiceZustand()
