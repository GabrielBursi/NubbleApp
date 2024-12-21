export interface CommentModel {
	id: number
	message: string
	createdAt: string
	createdAtRelative: string
	author: {
		id: number
		profileURL: string
		name: string
		userName: string
	}
}
