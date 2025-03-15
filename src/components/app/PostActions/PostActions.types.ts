import { PostModel } from '@/domain/Post'

import { PostItemProps } from '../PostItem/PostItem.types'

export type PostActionsProps = Partial<
	Pick<PostModel, 'reactionCount' | 'commentCount' | 'favoriteCount'>
> &
	Pick<PostItemProps, 'hideCommentAction'>
