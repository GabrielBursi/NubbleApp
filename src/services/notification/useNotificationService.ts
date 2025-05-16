import { useRef } from 'react'

import { FirebaseMessaging } from './FirebaseMessaging'
import { NotificationService } from './models'

export const useNotificationService = (): NotificationService => {
	const notificationServiceRef = useRef<NotificationService | null>(null)

	if (!notificationServiceRef.current) {
		notificationServiceRef.current = new FirebaseMessaging()
	}

	return notificationServiceRef.current
}
