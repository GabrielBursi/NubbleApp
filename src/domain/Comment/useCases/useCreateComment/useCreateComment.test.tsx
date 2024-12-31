import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { TestProvider } from '@/providers'
import { useToastService } from '@/services/toast/useToast'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useCreateComment } from './useCreateComment'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UseInvalidateQueryComments = typeof useInvalidateQueryComments
type ReturnUseInvalidateQueryComments =
	ReturnHookMocked<UseInvalidateQueryComments>
type MockUseInvalidateQueryComments = HookMocked<UseInvalidateQueryComments>

jest.mock('@/services/toast/useToast')
jest.mock('@/hooks/useInvalidateQueryComments/useInvalidateQueryComments')

describe('useCreateComment', () => {
	const spySendComment = jest.spyOn(CommentApi, 'SendComment')
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()
	const mockInvalidateCommentCountPost = jest.fn()
	const mockInvalidateQueryComments = jest.fn()

	const mockInicialUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	const mockUseInvalidateQueryComments: ReturnUseInvalidateQueryComments = {
		invalidateCommentCountPost: mockInvalidateCommentCountPost,
		invalidateQueryComments: mockInvalidateQueryComments,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockInicialUseToastService
		)
		;(
			useInvalidateQueryComments as MockUseInvalidateQueryComments
		).mockReturnValue(mockUseInvalidateQueryComments)
	})

	it('should create a comment correctly', async () => {
		const { result } = renderHook(() => useCreateComment('1'), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(spySendComment).toHaveBeenCalledWith('1', 'jest')
			expect(mockShowToast).toHaveBeenCalledWith({
				message: 'Comentário criado.',
				position: 'bottom',
			})
			expect(mockInvalidateQueryComments).toHaveBeenCalledWith('1')
			expect(mockInvalidateCommentCountPost).toHaveBeenCalledWith(
				'1',
				'increment'
			)
		})
	})

	it('should return the comment create correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(result.current.createdComment).toBeTruthy()
		})
	})
})
