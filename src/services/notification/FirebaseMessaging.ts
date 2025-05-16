import messaging from '@react-native-firebase/messaging'

import { NotificationService, NotificationToNavigate } from './models'

export class FirebaseMessaging implements NotificationService {
	onNotificationOpenedApp(
		listener: (action: NotificationToNavigate | null) => void
	): () => void {
		const unsubscribe = messaging().onNotificationOpenedApp((remoreMessage) => {
			if (remoreMessage.data) {
				const action = this.getActionFromNotificationData(remoreMessage.data)
				listener(action)
			}
		})

		return unsubscribe
	}

	async getInitialNotification(): Promise<NotificationToNavigate | null> {
		const notification = await messaging().getInitialNotification()
		if (notification?.data) {
			return this.getActionFromNotificationData(notification.data)
		}
		return null
	}

	private getActionFromNotificationData(data: {
		[key: string]: string | object
	}): NotificationToNavigate | null {
		if (typeof data.navigate === 'string') {
			const navigateProps = JSON.parse(data.navigate) as Record<string, unknown>

			if (typeof navigateProps.screen === 'string') {
				const screen = navigateProps.screen
				const params =
					!!navigateProps.params && typeof navigateProps.params === 'object'
						? navigateProps.params
						: undefined

				return { screen, params }
			}
		}

		return null
	}

	getToken(): Promise<string> {
		return messaging().getToken()
	}
}
