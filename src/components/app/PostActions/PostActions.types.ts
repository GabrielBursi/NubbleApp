import { PostModel } from '@/domain/Post'

export type PostActionsProps = Partial<
	Pick<PostModel, 'reactionCount' | 'commentCount' | 'favoriteCount'>
>
