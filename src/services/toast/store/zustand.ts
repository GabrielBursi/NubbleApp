import { create } from 'zustand'

import { StrictOmit } from '@/types/utils'

import { ToastService } from '../models'

const useToastStore = create<ToastService>((set) => ({
	toast: null,
	showToast: (toast) => set({ toast }),
	hideToast: () => set({ toast: null }),
}))

export const useToastZustand = (): ToastService['toast'] => {
	return useToastStore((state) => state.toast)
}

export const useToastServiceZustand = (): StrictOmit<ToastService, 'toast'> => {
	const showToast = useToastStore((state) => state.showToast)
	const hideToast = useToastStore((state) => state.hideToast)

	return {
		showToast,
		hideToast,
	}
}
