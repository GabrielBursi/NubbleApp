import { PostComment } from '@/types/api'
import { RequiredDeep } from '@/types/recursive'

export interface CommentAPIModel
	extends RequiredDeep<
		Pick<
			PostComment,
			'message' | 'user_id' | 'post_id' | 'created_at' | 'updated_at' | 'id'
		>
	> {
	meta: unknown
	user: {
		id: number
		first_name: string
		last_name: string
		username: string
		email: string
		profile_url: string
		is_online: boolean
		full_name: string
	}
}
