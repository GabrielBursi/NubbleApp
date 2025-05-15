import { DeleteNotificationToken } from './DeleteNotificationToken'
import { GetAllWithPagination } from './GetAllWithPagination'
import { GetById } from './GetById'
import { SaveNotificationToken } from './SaveNotificationToken'
import { Update } from './Update'

export const UserServices = {
	DeleteNotificationToken,
	GetAllWithPagination,
	GetById,
	SaveNotificationToken,
	Update,
} as const
