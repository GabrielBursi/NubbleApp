import { screen } from '@testing-library/react-native'

import { mockPosts } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { PostImage } from './PostImage'

describe('<PostImage/>', () => {
	const imageUrl = mockPosts[0]!.imageURL

	it('should render the post image correctly', () => {
		customRender(<PostImage imageURL={imageUrl} />)

		expect(screen.getByRole('img', { name: imageUrl })).toBeOnTheScreen()
	})
})
