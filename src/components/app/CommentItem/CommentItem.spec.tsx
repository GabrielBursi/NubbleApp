import { screen, userEvent } from '@testing-library/react-native'

import { useDeleteComment } from '@/domain/Comment/useCases/useDeleteComment/useDeleteComment'
import { generateComment, generatePost } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { CommentItem } from './CommentItem'
import { CommentItemProps } from './CommentItem.types'

type UseDeleteComment = typeof useDeleteComment
type ReturnUseDeleteComment = ReturnHookMocked<UseDeleteComment>
type MockUseDeleteComment = HookMocked<UseDeleteComment>

jest.mock('@/domain/Comment/useCases/useDeleteComment/useDeleteComment')

describe('<CommentItem/>', () => {
	const mockProps: CommentItemProps = {
		comment: generateComment(),
		postAuthorId: '1',
		userId: 1,
		postId: generatePost().id,
	}

	const mockConfirmDelete = jest.fn()
	const mockDeleteComment = jest.fn()
	const mockIsAllowedToDelete = jest.fn()

	const initialMockReturnUseCommentList: ReturnUseDeleteComment = {
		confirmDelete: mockConfirmDelete,
		deleteComment: mockDeleteComment,
		isAllowedToDelete: mockIsAllowedToDelete,
	}

	beforeEach(() => {
		mockIsAllowedToDelete.mockReturnValue(true)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		mockConfirmDelete.mockImplementation((callback) => callback())
		;(useDeleteComment as MockUseDeleteComment).mockReturnValue(
			initialMockReturnUseCommentList
		)
	})

	it('should render comment item correctly', () => {
		customRender(<CommentItem {...mockProps} />)

		expect(
			screen.getByRole('text', { name: mockProps.comment.message })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.comment.createdAtRelative })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.comment.author.userName })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.comment.author.userName })
		).toBeOnTheScreen()
	})

	it('should verify is is allowed to delete correctly', () => {
		customRender(<CommentItem {...mockProps} />)

		expect(mockIsAllowedToDelete).toHaveBeenCalledWith(
			mockProps.comment,
			Number(mockProps.postAuthorId),
			mockProps.userId
		)
	})

	it('should delete the comment correctly', async () => {
		customRender(<CommentItem {...mockProps} />)

		await userEvent.longPress(screen.getByTestId('container-comment'))
		expect(mockConfirmDelete).toHaveBeenCalledTimes(1)
		expect(mockConfirmDelete).toHaveBeenCalledWith(expect.any(Function))

		expect(mockDeleteComment).toHaveBeenCalledTimes(1)
		expect(mockDeleteComment).toHaveBeenCalledWith(mockProps.comment.id)
	})
})
