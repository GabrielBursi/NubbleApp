import { renderHook, act, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostReactionApi, PostReactionType } from '@/domain/PostReaction'
import * as MockHookUseInvalidateQueryPosts from '@/hooks/useInvalidateQueryPosts/useInvalidateQueryPosts'
import { TestProvider } from '@/providers'
import { generatePost } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useReaction } from './useReaction'

type UseInvalidateQueryPosts =
	typeof MockHookUseInvalidateQueryPosts.useInvalidateQueryPosts
type ReturnUseInvalidateQueryPosts = ReturnHookMocked<UseInvalidateQueryPosts>
type MockUseInvalidateQueryPosts = HookMocked<UseInvalidateQueryPosts>

describe('useReaction', () => {
	jest.spyOn(MockHookUseInvalidateQueryPosts, 'useInvalidateQueryPosts')
	const mockPost = generatePost()
	const mockCancelQueryPosts = jest.fn()
	const mockInvalidateQueryFavorites = jest.fn()
	const mockUpdatePostReactionCount = jest.fn()
	const mockOnError = jest.fn()
	const mockOnSuccess = jest.fn()
	const spyReactToPost = jest.spyOn(PostReactionApi, 'ReactToPost')

	const mockReturnUseInvalidateQueryPosts: ReturnUseInvalidateQueryPosts = {
		cancelQueryPosts: mockCancelQueryPosts,
		invalidateQueryFavorites: mockInvalidateQueryFavorites,
		updatePostReactionCount: mockUpdatePostReactionCount,
	}

	beforeEach(() => {
		;(
			MockHookUseInvalidateQueryPosts.useInvalidateQueryPosts as MockUseInvalidateQueryPosts
		).mockImplementation(() => mockReturnUseInvalidateQueryPosts)
	})

	it('should react to a post', async () => {
		const { result } = renderHook(
			() =>
				useReaction({
					post: mockPost,
					postReactionType: PostReactionType.LIKE,
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.reactToPost()
		})
		expect(spyReactToPost).toHaveBeenCalledWith(
			mockPost.id,
			PostReactionType.LIKE
		)
		await waitFor(() => {
			expect(result.current.reaction).toBeTruthy()
			expect(result.current.error).toBeNull()
		})
	})

	it('should update posts query state and increment reaction', async () => {
		const post = generatePost()
		post.reactions = []

		const { result } = renderHook(
			() =>
				useReaction({
					post,
					postReactionType: PostReactionType.FAVORITE,
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.reactToPost()
		})
		await waitFor(() => {
			expect(mockUpdatePostReactionCount).toHaveBeenCalledWith(
				post.id,
				PostReactionType.FAVORITE,
				'increment'
			)
		})
	})

	it('should update posts query state and decrement reaction', async () => {
		const post = generatePost()
		post.reactions = [
			{ emojiType: PostReactionType.FAVORITE, postId: 123 },
			{ emojiType: PostReactionType.LIKE, postId: 456 },
		]

		const { result } = renderHook(
			() =>
				useReaction({
					post,
					postReactionType: PostReactionType.FAVORITE,
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.reactToPost()
		})
		await waitFor(() => {
			expect(mockUpdatePostReactionCount).toHaveBeenCalledWith(
				post.id,
				PostReactionType.FAVORITE,
				'decrement'
			)
		})
	})

	it('should invalidate favorites query when reaction type is favorite', async () => {
		const { result } = renderHook(
			() =>
				useReaction({
					post: mockPost,
					postReactionType: PostReactionType.FAVORITE,
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.reactToPost()
		})
		await waitFor(() => {
			expect(mockInvalidateQueryFavorites).toHaveBeenCalled()
		})
	})

	it('should call onSuccess', async () => {
		const { result } = renderHook(
			() =>
				useReaction({
					post: mockPost,
					postReactionType: PostReactionType.FAVORITE,
					options: { onSuccess: mockOnSuccess },
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.reactToPost()
		})
		await waitFor(() => {
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('should return false when post does not have the specified reaction', () => {
		const post = generatePost()
		post.reactions = [
			{ emojiType: PostReactionType.LIKE, postId: 123 },
			{ emojiType: PostReactionType.LIKE, postId: 456 },
		]

		const { result } = renderHook(
			() => useReaction({ post, postReactionType: PostReactionType.FAVORITE }),
			{ wrapper: TestProvider }
		)

		expect(result.current.hasReacted).toBe(false)
	})

	it('should return true when post has the specified reaction', () => {
		const post = generatePost()
		post.reactions = [
			{ emojiType: PostReactionType.LIKE, postId: 123 },
			{ emojiType: PostReactionType.FAVORITE, postId: 456 },
		]

		const { result } = renderHook(
			() => useReaction({ post, postReactionType: PostReactionType.FAVORITE }),
			{ wrapper: TestProvider }
		)

		expect(result.current.hasReacted).toBe(true)
	})

	it('should handle empty reactions array', () => {
		const post = generatePost()
		post.reactions = []

		const { result } = renderHook(
			() => useReaction({ post, postReactionType: PostReactionType.FAVORITE }),
			{ wrapper: TestProvider }
		)

		expect(result.current.hasReacted).toBe(false)
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useReaction({
					post: mockPost,
					postReactionType: PostReactionType.FAVORITE,
					options: { onError: mockOnError },
				}),
			{
				wrapper: TestProvider,
			}
		)

		serverTest.use(
			...[
				http.post(
					`${Config.API_URL}${END_POINTS_API.POST_REACTION}/:post_id/:reaction_type`,
					() => HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.reactToPost()
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('erro ao reagir ao post')
			expect(result.current.reaction).toBeNull()
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				useReaction({
					post: mockPost,
					postReactionType: PostReactionType.FAVORITE,
					options: { onError: mockOnError, errorMessage: 'custom message' },
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(
					`${Config.API_URL}${END_POINTS_API.POST_REACTION}/:post_id/:reaction_type`,
					() => HttpResponse.error()
				),
			]
		)

		await act(() => {
			result.current.reactToPost()
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom message')
			expect(result.current.reaction).toBeNull()
		})
	})
})
