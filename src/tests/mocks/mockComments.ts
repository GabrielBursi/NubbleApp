import { uniqueId } from 'lodash'

import { CommentModel, CommentAPIModel } from '@/domain/Comment'

import { customFaker } from '../utils/customFaker'

export const generateCommentAPI = (): CommentAPIModel => ({
	id: Number(uniqueId()),
	user_id: Number(uniqueId()),
	created_at: customFaker.date.past().toISOString(),
	updated_at: customFaker.date.recent().toISOString(),
	post_id: Number(uniqueId()),
	message: customFaker.lorem.text(),
	user: {
		id: Number(uniqueId()),
		full_name: customFaker.person.fullName(),
		first_name: customFaker.person.firstName(),
		last_name: customFaker.person.lastName(),
		username: customFaker.internet.username(),
		profile_url: customFaker.image.url(),
		email: customFaker.internet.email(),
		is_online: customFaker.datatype.boolean(),
	},
	meta: {
		like_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
		favorite_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
		comments_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
	},
})

export const generateComment = (): CommentModel => ({
	id: Number(uniqueId()),
	author: {
		profileURL: customFaker.image.url(),
		name: customFaker.person.fullName(),
		userName: customFaker.internet.username(),
		id: Number(uniqueId()),
	},
	message: customFaker.lorem.text(),
	createdAt: customFaker.date.past().toISOString(),
})

export const mockComments: CommentModel[] = [
	generateComment(),
	generateComment(),
	generateComment(),
	generateComment(),
]

export const mockCommentsAPI: CommentAPIModel[] = [
	generateCommentAPI(),
	generateCommentAPI(),
	generateCommentAPI(),
	generateCommentAPI(),
]
