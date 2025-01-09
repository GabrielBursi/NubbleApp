import Config from 'react-native-config'

import { StrictOmit } from '@/types/utils'

import { ToastService } from './models'
import {
	useToastServiceZustand,
	useToastZustand,
	useToastContext,
	useToastServiceContext,
} from './store'

export const useToast: () => ToastService['toast'] = Number(
	Config.USE_CONTEXT_SERVICE
)
	? useToastContext
	: useToastZustand
export const useToastService: () => StrictOmit<ToastService, 'toast'> = Number(
	Config.USE_CONTEXT_SERVICE
)
	? useToastServiceContext
	: useToastServiceZustand
