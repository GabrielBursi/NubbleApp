import { Alert } from 'react-native'

import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { TestProvider } from '@/providers'
import { generateComment } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { customAct } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useDeleteComment } from './useDeleteComment'

type UseInvalidateQueryComments = typeof useInvalidateQueryComments
type ReturnUseInvalidateQueryComments =
	ReturnHookMocked<UseInvalidateQueryComments>
type MockUseInvalidateQueryComments = HookMocked<UseInvalidateQueryComments>

jest.mock('@/hooks/useInvalidateQueryComments/useInvalidateQueryComments')

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
		invalidateCommentCountPost: mockInvalidateCommentCountPost,
		invalidateQueryComments: mockInvalidateQueryComments,
	}

	beforeEach(() => {
		;(
			useInvalidateQueryComments as MockUseInvalidateQueryComments
		).mockReturnValue(mockUseInvalidateQueryComments)
	})

	it('should delete a comment correctly', async () => {
		const { result } = renderHook(
			() => useDeleteComment('1', { onSuccess: mockOnSuccess }),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(() => {
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

		await customAct(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(result.current.message).toBeTruthy()
		})
	})

	it('should confirm to delete correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await customAct(() => {
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

		await customAct(() => {
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

		await customAct(() => {
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

		await customAct(() => {
			result.current.deleteComment(1)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom message')
		})
	})
})
