import { UserServices } from '@/api/services'

export const DeleteNotificationToken = (): Promise<string> => {
	return UserServices.DeleteNotificationToken()
}
