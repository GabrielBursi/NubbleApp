import { Post } from '@/domain'
import { OptionalPros } from '@/types/utils'

type Author = Post['author']
export type PostBottomProps = OptionalPros<
	Pick<Post, 'text' | 'commentCount'>,
	'commentCount'
> &
	Pick<Author, 'userName'>
