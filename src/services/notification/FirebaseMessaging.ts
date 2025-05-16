import messaging from '@react-native-firebase/messaging'

import { NotificationService } from './models'

export class FirebaseMessaging implements NotificationService {
	getToken(): Promise<string> {
		return messaging().getToken()
	}
}
