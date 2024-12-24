import { Create } from './Create'
import { DeleteById } from './DeleteById'
import { GetAllWithPagination } from './GetAllWithPagination'

export const CommentServices = {
	Create,
	DeleteById,
	GetAllWithPagination,
} as const
