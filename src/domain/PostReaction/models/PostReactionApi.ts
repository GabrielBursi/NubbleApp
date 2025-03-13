import { PostAPIModel } from '@/domain/Post/models'
import { UserAPIModel } from '@/domain/User'

import { PostReactionType } from './PostReactionType'

export interface PostReactionBaseAPIModel {
	id: number
	emoji_type: PostReactionType
	user_id: number
	post_id: number
	is_checked: true
	created_at: string
	updated_at: string
}

export interface PostReactionAPIModel extends PostReactionBaseAPIModel {
	user: UserAPIModel
	post: Pick<PostAPIModel, 'id' | 'text' | 'image_url' | 'status'>
}
