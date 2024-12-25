import { Toast } from './Toast'

export interface ToastService {
	toast: Toast | null
	showToast: (toast: Toast) => void
	hideToast: () => void
}
