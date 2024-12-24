import { CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'

export type CommentItemProps = {
	comment: CommentModel
	userId: number
	postAuthorId: PostModel['author']['id']
}
