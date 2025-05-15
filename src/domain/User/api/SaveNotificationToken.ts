import { UserServices } from '@/api/services'

export const SaveNotificationToken = (token: string): Promise<string> => {
	return UserServices.SaveNotificationToken(token)
}
