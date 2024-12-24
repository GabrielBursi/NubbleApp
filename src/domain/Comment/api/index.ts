import { DeleteComment } from './DeleteComment'
import { GetComments } from './GetComments'
import { SendComment } from './SendComment'

export const CommentApi = {
	DeleteComment,
	GetComments,
	SendComment,
} as const
