import { screen, userEvent, fireEvent } from '@testing-library/react-native'

import { useDeleteComment } from '@/domain/Comment/useCases/useDeleteComment/useDeleteComment'
import { useToastService } from '@/services/toast/useToast'
import { generateComment, generatePost } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { CommentItem } from './CommentItem'
import { CommentItemProps } from './CommentItem.types'

type UseDeleteComment = typeof useDeleteComment
type ReturnUseDeleteComment = ReturnHookMocked<UseDeleteComment>
type MockUseDeleteComment = HookMocked<UseDeleteComment>

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

jest.mock('@/domain/Comment/useCases/useDeleteComment/useDeleteComment')
jest.mock('@/services/toast/useToast')

describe('<CommentItem/>', () => {
	const mockProps: CommentItemProps = {
		comment: generateComment(),
		postAuthorId: '1',
		postId: generatePost().id,
	}

	const mockConfirmDelete = jest.fn()
	const mockDeleteComment = jest.fn()
	const mockIsAllowedToDelete = jest.fn()
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()

	const initialMockReturnUseCommentList: ReturnUseDeleteComment = {
		confirmDelete: mockConfirmDelete,
		deleteComment: mockDeleteComment,
		isAllowedToDelete: mockIsAllowedToDelete,
	}

	const mockUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	beforeEach(() => {
		mockIsAllowedToDelete.mockReturnValue(true)
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		mockConfirmDelete.mockImplementation((callback) => callback())
		;(useDeleteComment as MockUseDeleteComment).mockReturnValue(
			initialMockReturnUseCommentList
		)
		;(useDeleteComment as MockUseDeleteComment).mockImplementation(
			(postId: string, { onSuccess }: { onSuccess: () => void }) => {
				return {
					...initialMockReturnUseCommentList,
					deleteComment: mockDeleteComment.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
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
		customRender(<CommentItem {...mockProps} userId={1} />)

		expect(mockIsAllowedToDelete).toHaveBeenCalledWith(
			mockProps.comment,
			Number(mockProps.postAuthorId),
			1
		)
	})

	it('should delete the comment correctly', async () => {
		customRender(<CommentItem {...mockProps} />)

		fireEvent(screen.getByTestId('container-comment'), 'onResponderMove', {
			nativeEvent: {
				pageX: 50,
				pageY: 100,
			},
		})

		await userEvent.press(
			screen.getByRole('button', { name: /Excluir comentário/i })
		)

		expect(mockDeleteComment).toHaveBeenCalledTimes(1)
		expect(mockDeleteComment).toHaveBeenCalledWith(mockProps.comment.id)
		expect(mockShowToast).toHaveBeenCalledWith({
			message: 'Comentário excluído.',
			position: 'bottom',
		})
	})

	it('should not show the delete button when the user has no permission', () => {
		mockIsAllowedToDelete.mockReturnValue(false)

		customRender(<CommentItem {...mockProps} />)

		fireEvent(screen.getByTestId('container-comment'), 'onResponderMove', {
			nativeEvent: {
				pageX: 50,
				pageY: 100,
			},
		})

		expect(
			screen.queryByRole('button', { name: /Excluir comentário/i })
		).not.toBeOnTheScreen()
	})
})
