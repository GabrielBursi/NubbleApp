import { DeleteNotificationToken } from './DeleteNotificationToken'
import { GetAllWithSearch } from './GetAllWithSearch'
import { GetById } from './GetById'
import { SaveNotificationToken } from './SaveNotificationToken'
import { Update } from './Update'

export const UserApi = {
	DeleteNotificationToken,
	GetAllWithSearch,
	GetById,
	SaveNotificationToken,
	Update,
} as const
