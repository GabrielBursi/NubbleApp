import { act, screen, userEvent } from '@testing-library/react-native'

import { useCreateComment } from '@/domain/Comment/useCases/useCreateComment/useCreateComment'
import { generateComment } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { TextInputAddComment } from './TextInputAddComment'

type UseCreateComment = typeof useCreateComment
type ReturnUseCreateComment = ReturnHookMocked<UseCreateComment>
type MockUseCreateComment = HookMocked<UseCreateComment>

jest.mock('@/domain/Comment/useCases/useCreateComment/useCreateComment')

describe('<TextInputAddComment/>', () => {
	const mockPostId = '1'

	const mockCreateComment = jest.fn()
	const mockResetCreateComment = jest.fn()

	const initMock: ReturnUseCreateComment = {
		createComment: mockCreateComment,
		createdComment: null,
		error: null,
		isSuccess: false,
		loading: false,
		resetCreateComment: mockResetCreateComment,
	}

	beforeEach(() => {
		;(useCreateComment as MockUseCreateComment).mockReturnValue(initMock)
	})

	it('should reset the mutation state after create a comment correctly', async () => {
		;(useCreateComment as MockUseCreateComment).mockReturnValue({
			...initMock,
			isSuccess: true,
			createdComment: generateComment(),
		})

		customRender(<TextInputAddComment postId={mockPostId} />)

		await act(() => {
			expect(mockResetCreateComment).toHaveBeenCalled()
		})
	})

	it('should create a comment correctly', async () => {
		customRender(<TextInputAddComment postId={mockPostId} />)

		await userEvent.type(
			screen.getByPlaceholderText('Adicione um comentário', { exact: true }),
			'jest'
		)
		await userEvent.press(screen.getByRole('button', { name: /enviar/i }))

		await act(() => {
			expect(mockCreateComment).toHaveBeenCalledWith({
				message: 'jest',
				postId: mockPostId,
			})
		})
	})
})
