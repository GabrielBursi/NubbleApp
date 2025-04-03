import { screen } from '@testing-library/react-native'

import { generatePost } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { PostItem } from './PostItem'

describe('<PostItem/>', () => {
	const post = generatePost()

	it('should render the post item correctly', () => {
		customRender(<PostItem post={post} />)

		expect(
			screen.getByText(`${post.commentCount}`, { exact: true })
		).toBeOnTheScreen()
		expect(
			screen.getByText(`${post.favoriteCount}`, { exact: true })
		).toBeOnTheScreen()
		expect(
			screen.getByText(`${post.reactionCount}`, { exact: true })
		).toBeOnTheScreen()
		expect(
			screen.getAllByText(`${post.author.userName}`, { exact: true })
		).toHaveLength(2)
		expect(screen.getByText(`${post.text}`, { exact: true })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: post.imageURL })).toBeOnTheScreen()
		expect(
			screen.getByRole('img', { name: post.author.profileURL })
		).toBeOnTheScreen()
	})
})
