import { Alert } from 'react-native'

import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { TestProvider } from '@/providers'
import { useToastService } from '@/services/toast/useToast'
import { generateComment } from '@/tests/mocks'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useDeleteComment } from './useDeleteComment'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UseInvalidateQueryComments = typeof useInvalidateQueryComments
type ReturnUseInvalidateQueryComments =
	ReturnHookMocked<UseInvalidateQueryComments>
type MockUseInvalidateQueryComments = HookMocked<UseInvalidateQueryComments>

jest.mock('@/services/toast/useToast')
jest.mock('@/hooks/useInvalidateQueryComments/useInvalidateQueryComments')

describe('useDeleteComment', () => {
	const spyDeleteComment = jest.spyOn(CommentApi, 'DeleteComment')
	const spyAlert = jest.spyOn(Alert, 'alert')
	const mockConfirmDelete = jest.fn()
	const mockComment = generateComment()
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()
	const mockInvalidateCommentCountPost = jest.fn()
	const mockInvalidateQueryComments = jest.fn()

	const mockUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	const mockUseInvalidateQueryComments: ReturnUseInvalidateQueryComments = {
		invalidateCommentCountPost: mockInvalidateCommentCountPost,
		invalidateQueryComments: mockInvalidateQueryComments,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
		)
		;(
			useInvalidateQueryComments as MockUseInvalidateQueryComments
		).mockReturnValue(mockUseInvalidateQueryComments)
	})

	it('should delete a comment correctly', async () => {
		const { result } = renderHook(() => useDeleteComment('1'), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(spyDeleteComment).toHaveBeenCalledWith(1)
			expect(mockShowToast).toHaveBeenCalledWith({
				message: 'Comentário excluído.',
				position: 'bottom',
			})
			expect(mockInvalidateQueryComments).toHaveBeenCalledWith('1')
			expect(mockInvalidateCommentCountPost).toHaveBeenCalledWith(
				'1',
				'decrement'
			)
		})
	})

	it('should return the message of comment deleted correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(result.current.message).toBeTruthy()
		})
	})

	it('should confirm to delete correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.confirmDelete(mockConfirmDelete)
		})

		expect(spyAlert).toHaveBeenCalled()
	})

	it("should allow to delete when is post's user correctly", () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		expect(
			result.current.isAllowedToDelete(
				mockComment,
				mockComment.author.id,
				mockComment.author.id
			)
		).toBe(true)
	})

	it("should allow to delete when is comments's user correctly", () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		expect(
			result.current.isAllowedToDelete(mockComment, mockComment.author.id, -55)
		).toBe(true)
	})
})
