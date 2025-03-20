import { Alert } from 'react-native'

import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { useInvalidateQueryPosts } from '@/hooks/useInvalidateQueryPosts/useInvalidateQueryPosts'
import { TestProvider } from '@/providers'
import { generateComment } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useDeleteComment } from './useDeleteComment'

type UseInvalidateQueryComments = typeof useInvalidateQueryComments
type ReturnUseInvalidateQueryComments =
	ReturnHookMocked<UseInvalidateQueryComments>
type MockUseInvalidateQueryComments = HookMocked<UseInvalidateQueryComments>

type UseInvalidateQueryPosts = typeof useInvalidateQueryPosts
type ReturnUseInvalidateQueryPosts = ReturnHookMocked<UseInvalidateQueryPosts>
type MockUseInvalidateQueryPosts = HookMocked<UseInvalidateQueryPosts>

jest.mock('@/hooks/useInvalidateQueryComments/useInvalidateQueryComments')
jest.mock('@/hooks/useInvalidateQueryPosts/useInvalidateQueryPosts')

describe('useDeleteComment', () => {
	const spyDeleteComment = jest.spyOn(CommentApi, 'DeleteComment')
	const spyAlert = jest.spyOn(Alert, 'alert')
	const mockConfirmDelete = jest.fn()
	const mockComment = generateComment()
	const mockInvalidateCommentCountPost = jest.fn()
	const mockInvalidateQueryComments = jest.fn()
	const mockOnSuccess = jest.fn()
	const mockOnError = jest.fn()

	const mockUseInvalidateQueryComments: ReturnUseInvalidateQueryComments = {
		invalidateQueryComments: mockInvalidateQueryComments,
	}

	const mockUseInvalidateQueryPosts: ReturnUseInvalidateQueryPosts = {
		updatePostCommentCount: mockInvalidateCommentCountPost,
	}

	beforeEach(() => {
		;(
			useInvalidateQueryComments as MockUseInvalidateQueryComments
		).mockReturnValue(mockUseInvalidateQueryComments)
		;(useInvalidateQueryPosts as MockUseInvalidateQueryPosts).mockReturnValue(
			mockUseInvalidateQueryPosts
		)
	})

	it('should delete a comment correctly', async () => {
		const { result } = renderHook(
			() => useDeleteComment('1', { onSuccess: mockOnSuccess }),
			{
				wrapper: TestProvider,
			}
		)

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(spyDeleteComment).toHaveBeenCalledWith(1)
			expect(mockOnSuccess).toHaveBeenCalled()
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

	it("should allow to delete when is delete's user correctly", () => {
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

	it('should return the message null when it"s error correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		serverTest.use(
			...[
				http.delete(`${Config.API_URL}${END_POINTS_API.COMMENT}/:id`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.deleteComment(1)
		})

		await waitFor(() => {
			expect(result.current.message).toBeNull()
		})
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() => useDeleteComment('1', { onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.delete(`${Config.API_URL}${END_POINTS_API.COMMENT}/:id`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.deleteComment(1)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('Ocorreu um erro.')
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useDeleteComment('1', {
					onError: mockOnError,
					errorMessage: 'custom message',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.delete(`${Config.API_URL}${END_POINTS_API.COMMENT}/:id`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.deleteComment(1)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom message')
		})
	})
})
