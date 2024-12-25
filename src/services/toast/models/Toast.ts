export interface Toast {
	message: string
	type?: 'success' | 'error'
	duration?: number
	action?: {
		title: string
		onPress: () => void
	}
}
