import { useCallback, useEffect } from 'react'

import { useAppNavigation } from '@/hooks'

import { NotificationToNavigate } from './models'
import { useNotificationService } from './useNotificationService'

export const useNotificationAction = () => {
	const { navigationAppStack } = useAppNavigation()
	const notificationService = useNotificationService()

	const handleNavigation = useCallback(
		(action: NotificationToNavigate | null) => {
			if (action) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				navigationAppStack.navigate<any>(action.screen, action.params)
			}
		},
		[navigationAppStack]
	)

	useEffect(() => {
		notificationService
			.getInitialNotification()
			.then(handleNavigation)
			.catch(console.log)
	}, [handleNavigation, notificationService])

	useEffect(() => {
		return notificationService.onNotificationOpenedApp(handleNavigation)
	}, [handleNavigation, notificationService])
}
