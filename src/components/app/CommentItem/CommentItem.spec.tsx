import { screen } from '@testing-library/react-native'

import { generateComment } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { CommentItem } from './CommentItem'
import { CommentItemProps } from './CommentItem.types'

describe('<CommentItem/>', () => {
	const mockProps: CommentItemProps = generateComment()

	it('should render comment item correctly', () => {
		customRender(<CommentItem {...mockProps} />)

		expect(
			screen.getByRole('text', { name: mockProps.message })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.createdAtRelative })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.author.userName })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.author.userName })
		).toBeOnTheScreen()
	})
})
