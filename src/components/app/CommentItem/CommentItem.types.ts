import { CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { UserModel } from '@/domain/User'

export type CommentItemProps = {
	comment: CommentModel
	userId?: UserModel['id']
	postAuthorId: PostModel['author']['id']
	postId: PostModel['id']
}
