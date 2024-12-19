import { screen } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { CommentItem } from './CommentItem'
import { CommentItemProps } from './CommentItem.types'

describe('<CommentItem/>', () => {
	const mockProps: CommentItemProps = {
		id: customFaker.number.int(),
		message: customFaker.lorem.text(),
		createdAt: customFaker.date.past().toUTCString(),
		author: {
			id: customFaker.number.int(),
			name: customFaker.person.firstName(),
			profileURL: customFaker.image.url(),
			userName: customFaker.internet.username(),
		},
	}

	it('should render comment item correctly', () => {
		customRender(<CommentItem {...mockProps} />)

		expect(
			screen.getByRole('text', { name: mockProps.message })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.author.userName })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.author.userName })
		).toBeOnTheScreen()
	})
})
