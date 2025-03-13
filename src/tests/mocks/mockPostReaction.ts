/* eslint-disable sonarjs/pseudo-random */
import { uniqueId } from 'lodash'

import {
	PostReactionAPIModel,
	PostReactionBaseAPIModel,
	PostReactionBaseModel,
	PostReactionModel,
	PostReactionType,
} from '@/domain/PostReaction'

import { customFaker } from '../utils/customFaker'

import { generatePost, generatePostAPI } from './mockPosts'
import { generateUser, generateUserApi } from './mockUser'

const getRandomPostReactionType = (): PostReactionType => {
	const values = Object.values(PostReactionType)
	return values[Math.floor(Math.random() * values.length)]!
}

export const generateMockPostReactionBaseApi =
	(): PostReactionBaseAPIModel => ({
		emoji_type: getRandomPostReactionType(),
		id: Number(uniqueId()),
		is_checked: customFaker.datatype.boolean(),
		post_id: Number(uniqueId()),
		created_at: customFaker.date.past().toISOString(),
		updated_at: customFaker.date.recent().toISOString(),
		user_id: Number(uniqueId()),
	})

export const generateMockPostReactionBase = (): PostReactionBaseModel => ({
	emojiType: getRandomPostReactionType(),
	id: Number(uniqueId()),
	isChecked: customFaker.datatype.boolean(),
	postId: Number(uniqueId()),
	createdAt: customFaker.date.past().toISOString(),
	updatedAt: customFaker.date.recent().toISOString(),
	userId: Number(uniqueId()),
})

export const generateMockPostReactionApi = (): PostReactionAPIModel => {
	const { id, text, image_url, status } = generatePostAPI()

	return {
		...generateMockPostReactionBaseApi(),
		post: {
			id,
			text,
			image_url,
			status,
		},
		user: generateUserApi(),
	}
}
export const generateMockPostReaction = (): PostReactionModel => {
	const { id, text, imageURL } = generatePost()

	return {
		...generateMockPostReactionBase(),
		author: generateUser(),
		post: {
			id,
			text,
			imageURL,
		},
	}
}

const MOCK_COUNT = 15

export const mockReactionsApi = Array.from(
	{ length: MOCK_COUNT },
	generateMockPostReactionApi
)

export const mockReactions = Array.from(
	{ length: MOCK_COUNT },
	generateMockPostReaction
)
