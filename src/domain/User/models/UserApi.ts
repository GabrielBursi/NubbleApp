export interface UserAPIModel {
	id: number
	first_name: string
	last_name: string
	username: string
	email: string
	profile_url: string
	is_online: boolean
	full_name: string
	meta: {
		following_count: string
		followers_count: string
	}
}
