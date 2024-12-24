import { screen } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { PostCommentsScreen } from './PostComments'

describe('<PostCommentsScreen/>', () => {
	it('should render', () => {
		customRender(
			<PostCommentsScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'PostCommentScreen',
					name: 'PostCommentScreen',
					params: { postId: 'PostCommentScreen', postAuthorId: '1' },
					path: 'PostCommentScreen',
				}}
			/>
		)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})
})
