import { Post } from '@/domain'

export type PostActionsProps = Partial<
	Pick<Post, 'reactionCount' | 'commentCount' | 'favoriteCount'>
>
