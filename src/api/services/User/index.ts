import { GetAllWithPagination } from './GetAllWithPagination'
import { GetById } from './GetById'
import { IsFollowing } from './IsFollowing'

export const UserServices = {
	GetAllWithPagination,
	GetById,
	IsFollowing,
} as const
