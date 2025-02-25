import { screen, userEvent } from '@testing-library/react-native'

import { useCreateComment } from '@/domain/Comment/useCases/useCreateComment/useCreateComment'
import { useToastService } from '@/services/toast/useToast'
import { generateComment } from '@/tests/mocks'
import { customAct, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { TextInputAddComment } from './TextInputAddComment'

type UseCreateComment = typeof useCreateComment
type ReturnUseCreateComment = ReturnHookMocked<UseCreateComment>
type MockUseCreateComment = HookMocked<UseCreateComment>

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

jest.mock('@/domain/Comment/useCases/useCreateComment/useCreateComment')
jest.mock('@/services/toast/useToast')

describe('<TextInputAddComment/>', () => {
	const mockPostId = '1'

	const mockCreateComment = jest.fn()
	const mockResetCreateComment = jest.fn()
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()

	const initMock: ReturnUseCreateComment = {
		createComment: mockCreateComment,
		createdComment: null,
		error: null,
		isSuccess: false,
		loading: false,
		resetCreateComment: mockResetCreateComment,
	}

	const mockUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	beforeEach(() => {
		;(useCreateComment as MockUseCreateComment).mockReturnValue(initMock)
		;(useCreateComment as MockUseCreateComment).mockImplementation(
			(postId: string, { onSuccess }: { onSuccess: () => void }) => {
				return {
					...initMock,
					createComment: mockCreateComment.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
		)
	})

	it('should reset the mutation state after create a comment correctly', async () => {
		;(useCreateComment as MockUseCreateComment).mockReturnValue({
			...initMock,
			isSuccess: true,
			createdComment: generateComment(),
		})

		customRender(<TextInputAddComment postId={mockPostId} />)

		await customAct(() => {
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

		await customAct(() => {
			expect(mockCreateComment).toHaveBeenCalledWith({
				message: 'jest',
				postId: mockPostId,
			})
			expect(mockShowToast).toHaveBeenCalledWith({
				message: 'Comentário criado.',
				position: 'bottom',
			})
		})
	})
})
