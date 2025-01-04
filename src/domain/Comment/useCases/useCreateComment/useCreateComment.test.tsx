import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { CommentApi } from '@/domain/Comment'
import { useInvalidateQueryComments } from '@/hooks/useInvalidateQueryComments/useInvalidateQueryComments'
import { TestProvider } from '@/providers'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'
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

	it('should create a comment correctly', async () => {
		const { result } = renderHook(
			() => useCreateComment('1', { onSuccess: mockOnSuccess }),
			{
				wrapper: TestProvider,
			}
		)

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

	it('should return the comment created correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(result.current.createdComment).toBeTruthy()
		})
	})

	it('should return the comment null when it"s error correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.COMMENT}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})

		await waitFor(() => {
			expect(result.current.createdComment).toBeNull()
		})
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() => useCreateComment('1', { onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.COMMENT}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('Ocorreu um erro.')
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useCreateComment('1', {
					onError: mockOnError,
					errorMessage: 'custom message',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.COMMENT}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom message')
		})
	})
})
