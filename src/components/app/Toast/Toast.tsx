import React, { useEffect } from 'react'

import { ToastContent } from '@/components'
import { useToast, useToastService } from '@/services/toast'

export const Toast = () => {
	const toast = useToast()
	const { hideToast } = useToastService()

	useEffect(() => {
		if (toast) {
			setTimeout(() => {
				hideToast()
			}, toast.duration ?? 2000)
		}
	}, [hideToast, toast])

	if (!toast) {
		return null
	}

	return <ToastContent {...toast} />
}
