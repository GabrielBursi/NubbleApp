import { Post } from '@/domain'

import { customFaker } from '../utils/customFaker'

export const mockPosts: Post[] = [
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
	{
		id: customFaker.string.uuid(),
		text: customFaker.lorem.sentence(),
		author: {
			profileURL: customFaker.image.url(),
			name: customFaker.person.fullName(),
			userName: customFaker.internet.username(),
		},
		imageURL: customFaker.image.url(),
		reactionCount: customFaker.number.int({ min: 0, max: 1000 }),
		commentCount: customFaker.number.int({ min: 0, max: 500 }),
		favoriteCount: customFaker.number.int({ min: 0, max: 300 }),
	},
]
