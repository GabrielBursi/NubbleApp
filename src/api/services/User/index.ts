import { GetAllWithPagination } from './GetAllWithPagination'
import { GetById } from './GetById'
import { Update } from './Update'

export const UserServices = {
	GetAllWithPagination,
	GetById,
	Update,
} as const
