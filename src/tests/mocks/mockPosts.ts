import { uniqueId } from 'lodash'

import { PostModel, PostAPIModel } from '@/domain/Post'

import { customFaker } from '../utils/customFaker'

export const generatePostAPI = (): PostAPIModel => ({
	id: Number(uniqueId()),
	text: customFaker.lorem.paragraph({ min: 3, max: 10 }),
	user_id: customFaker.number.int({ min: 1, max: 1000 }),
	image_url: customFaker.image.url(),
	is_fixed: customFaker.datatype.boolean(),
	is_activated: customFaker.datatype.boolean(),
	created_at: customFaker.date.past().toISOString(),
	updated_at: customFaker.date.recent().toISOString(),
	user: {
		id: customFaker.string.uuid(),
		full_name: customFaker.person.fullName(),
		first_name: customFaker.person.firstName(),
		last_name: customFaker.person.lastName(),
		username: customFaker.internet.username(),
		profile_url: customFaker.image.url(),
		email: customFaker.internet.email(),
		is_online: customFaker.datatype.boolean(),
	},
	status: customFaker.helpers.arrayElement(['draft', 'published', 'archived']),
	meta: {
		like_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
		favorite_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
		comments_count: customFaker.number.int({ min: 0, max: 1000 }).toString(),
	},
})

export const generatePost = (): PostModel => ({
	id: customFaker.database.mongodbObjectId(),
	text: customFaker.lorem.sentence(),
	author: {
		profileURL: customFaker.image.url(),
		name: customFaker.person.fullName(),
		userName: customFaker.internet.username(),
		id: customFaker.database.mongodbObjectId(),
	},
	imageURL: customFaker.image.url(),
	reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
	commentCount: customFaker.number.int({ min: 0, max: 500 }),
	favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
})

export const mockPosts: PostModel[] = [
	generatePost(),
	generatePost(),
	generatePost(),
	generatePost(),
]

export const mockPostsAPI: PostAPIModel[] = [
	generatePostAPI(),
	generatePostAPI(),
	generatePostAPI(),
	generatePostAPI(),
]
