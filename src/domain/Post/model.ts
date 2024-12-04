import { User } from '@/types/api'
import { StrictOmit } from '@/types/utils'

export interface Post {
	id: string
	text: string
	author: {
		profileURL: string
		name: string
		userName: string
	}
	imageURL: string
	reactionCount: number
	commentCount: number
	favoriteCount: number
}

export interface PostAPI {
	id: number
	text: string
	user_id: number
	image_url: string
	is_fixed: boolean
	is_activated: boolean
	created_at: string
	updated_at: string
	user: StrictOmit<
		Required<User>,
		| 'messages'
		| 'static_table_users'
		| 'remember_me_token_created_at'
		| 'remember_me_token'
	>
	status: string
	meta: {
		like_count: string
		favorite_count: string
		comments_count: string
	}
}
