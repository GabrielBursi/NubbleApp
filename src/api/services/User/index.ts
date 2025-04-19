import { GetAllWithPagination } from './GetAllWithPagination'
import { GetById } from './GetById'
import { IsFollowing } from './IsFollowing'
import { Update } from './Update'

export const UserServices = {
	GetAllWithPagination,
	GetById,
	IsFollowing,
	Update,
} as const
