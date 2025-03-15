import { Create } from './Create'
import { GetById } from './GetByid'
import { GetPosts } from './GetPosts'

export const PostApi = {
	Create,
	GetPosts,
	GetById,
} as const
