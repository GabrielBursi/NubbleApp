import { PostModel } from '@/domain/Post'

export type PostItemProps = PostModel & {
	/** @default false */
	hideCommentAction?: boolean
}
