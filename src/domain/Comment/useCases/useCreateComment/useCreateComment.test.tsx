import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { TestProvider } from '@/providers'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useCreateComment } from './useCreateComment'

type UseInvalidateQueryComments = typeof useInvalidateQueryComments
type ReturnUseInvalidateQueryComments =
	ReturnHookMocked<UseInvalidateQueryComments>
type MockUseInvalidateQueryComments = HookMocked<UseInvalidateQueryComments>

jest.mock('@/hooks/useInvalidateQueryComments/useInvalidateQueryComments')

describe('useCreateComment', () => {
	const spySendComment = jest.spyOn(CommentApi, 'SendComment')
	const mockInvalidateCommentCountPost = jest.fn()
	const mockInvalidateQueryComments = jest.fn()
	const mockOnSuccess = jest.fn()

	const mockUseInvalidateQueryComments: ReturnUseInvalidateQueryComments = {
		invalidateCommentCountPost: mockInvalidateCommentCountPost,
		invalidateQueryComments: mockInvalidateQueryComments,
	}

	beforeEach(() => {
		;(
			useInvalidateQueryComments as MockUseInvalidateQueryComments
		).mockReturnValue(mockUseInvalidateQueryComments)
	})

	it('should create a comment correctly', async () => {
		const { result } = renderHook(() => useCreateComment('1', mockOnSuccess), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(spySendComment).toHaveBeenCalledWith('1', 'jest')
			expect(mockOnSuccess).toHaveBeenCalled()
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
