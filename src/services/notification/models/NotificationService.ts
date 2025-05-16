import { NotificationToNavigate } from './NotificationToNavigate'

export interface NotificationService {
	getToken(): Promise<string>
	getInitialNotification(): Promise<NotificationToNavigate | null>
	onNotificationOpenedApp(
		listener: (action: NotificationToNavigate | null) => void
	): () => void
}
