import { PostModel } from '@/domain/Post'

export type CommentListProps = Pick<PostModel, 'id'> & {
	authorId: PostModel['author']['id']
}
