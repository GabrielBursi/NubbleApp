import { PostModel } from '@/domain/Post'

export type PostItemProps = {
	/** @default false */
	hideCommentAction?: boolean
	post: PostModel
}
