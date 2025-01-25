import { PostModel } from '@/domain/Post'
import { OptionalProps } from '@/types/utils'

type Author = PostModel['author']
export type PostBottomProps = OptionalProps<
	Pick<PostModel, 'text' | 'commentCount' | 'id'>,
	'commentCount'
> &
	Pick<Author, 'userName'> & {
		authorId: Author['id']
	}
