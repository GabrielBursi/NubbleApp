import { PostModel } from '@/domain/Post/models'
import { UserModel } from '@/domain/User'

import { PostReactionType } from './PostReactionType'

export interface PostReactionBaseModel {
	id: number
	emojiType: PostReactionType
	userId: number
	postId: number
	isChecked: boolean
	createdAt: string
	updatedAt: string
}
export interface PostReactionModel extends PostReactionBaseModel {
	author: UserModel
	post: Pick<PostModel, 'id' | 'text' | 'imageURL'>
}
