export interface PostModel {
	id: string
	text: string
	author: {
		profileURL: string
		name: string
		userName: string
		id: string
	}
	imageURL: string
	reactionCount: number
	commentCount: number
	favoriteCount: number
}
