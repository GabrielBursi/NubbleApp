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
		followingCount: number
		followersCount: number
	}
}

export interface UserDetailsModel extends UserModel {
	isFollowing: boolean
}

export type UpdateUserParams = Partial<
	Pick<UserModel, 'firstName' | 'lastName' | 'username'>
>
