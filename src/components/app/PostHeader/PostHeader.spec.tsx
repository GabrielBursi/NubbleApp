import { screen } from '@testing-library/react-native'

import { mockPosts } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { PostHeader } from './PostHeader'

describe('<PostHeader/>', () => {
	const post = mockPosts[0]
	const author = post.author

	it('should render the post header correctly', () => {
		customRender(<PostHeader author={author} />)

		expect(screen.getByRole('img', { name: author.userName })).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: author.userName })
		).toBeOnTheScreen()
	})
})
