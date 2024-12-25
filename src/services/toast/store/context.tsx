import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import { StrictOmit } from '@/types/utils'

import { Toast, ToastService } from '../models'

const ToastContext = createContext<ToastService | null>(null)

export const ToastProvider = ({ children }: Readonly<PropsWithChildren>) => {
	const [toast, setToast] = useState<ToastService['toast']>(null)

	const showToast = useCallback((_toast: Toast) => {
		setToast(_toast)
	}, [])

	const hideToast = useCallback(() => {
		setToast(null)
	}, [])

	const context: ToastService = useMemo(
		() => ({
			toast,
			showToast,
			hideToast,
		}),
		[toast, showToast, hideToast]
	)

	return (
		<ToastContext.Provider value={context}>{children}</ToastContext.Provider>
	)
}

export const useToastContext = (): ToastService['toast'] => {
	const context = useContext(ToastContext)
	if (!context) throw new Error('useToast  must be used inside a provider!')
	return context.toast
}

export const useToastServiceContext = (): StrictOmit<ToastService, 'toast'> => {
	const context = useContext(ToastContext)
	if (!context) throw new Error('useToast  must be used inside a provider!')
	const { hideToast, showToast } = context

	return { hideToast, showToast } as const
}
