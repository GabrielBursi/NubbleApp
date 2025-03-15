import { Create } from './Create'
import { GetAllWithPagination } from './GetAllWithPagination'
import { GetById } from './GetById'

export const PostServices = {
	Create,
	GetAllWithPagination,
	GetById,
} as const
