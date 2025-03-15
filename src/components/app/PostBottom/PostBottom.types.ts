import { PostModel } from '@/domain/Post'
import { OptionalProps } from '@/types/utils'

import { PostItemProps } from '../PostItem/PostItem.types'

type Author = PostModel['author']
export type PostBottomProps = OptionalProps<
	Pick<PostModel, 'text' | 'commentCount' | 'id'>,
	'commentCount'
> &
	Pick<Author, 'userName'> & {
		authorId: Author['id']
	} & Pick<PostItemProps, 'hideCommentAction'>
