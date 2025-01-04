export interface UserModel {
	id: number
	firstName: string
	lastName: string
	username: string
	email: string
	profileUrl: string
	isOnline: boolean
	fullName: string
	meta: {
		followingCount: string
		followersCount: string
	}
}
