import { PostModel } from '@/domain/Post'
import { OptionalPros } from '@/types/utils'

type Author = PostModel['author']
export type PostBottomProps = OptionalPros<
	Pick<PostModel, 'text' | 'commentCount'>,
	'commentCount'
> &
	Pick<Author, 'userName'>
