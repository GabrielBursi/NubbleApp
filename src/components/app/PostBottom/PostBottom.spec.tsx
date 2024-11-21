import { screen } from '@testing-library/react-native'

import { mockPosts } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { PostBottom } from './PostBottom'

describe('<PostBottom/>', () => {
	const post = mockPosts[0]
	const userName = post.author.userName
	const text = post.text

	it('should render the post bottom correctly', () => {
		customRender(<PostBottom text={text} userName={userName} />)

		expect(screen.getByRole('text', { name: text })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: userName })).toBeOnTheScreen()
	})

	it('should render the post bottom with comments correctly', () => {
		customRender(
			<PostBottom text={text} userName={userName} commentCount={10} />
		)

		expect(
			screen.getByRole('text', { name: /ver 10 comentários/i })
		).toBeOnTheScreen()
	})

	it('should render the post bottom with just only one comment correctly', () => {
		customRender(
			<PostBottom text={text} userName={userName} commentCount={1} />
		)

		expect(
			screen.getByRole('text', { name: /ver comentário/i })
		).toBeOnTheScreen()
	})
})
