/* eslint-disable jest/no-conditional-expect */
import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-native'

import { PostModel } from '@/domain/Post'
import { PostReactionType } from '@/domain/PostReaction'
import { generatePost, mockMetaPaginationApp } from '@/tests/mocks'
import { AppQueryKeys } from '@/types/api'
import { PageApp } from '@/types/shared'
import { ReturnHookMocked } from '@/types/tests'

import { useInvalidateQueryPosts } from './useInvalidateQueryPosts'

type MockSetQueryInfinityData = jest.MockedFunction<
	(
		key: QueryKey,
		updater: (
			oldData: InfiniteData<PageApp<PostModel>> | undefined
		) => InfiniteData<PageApp<PostModel>> | undefined
	) => void
>

type MockSetQueryData = jest.MockedFunction<
	(
		key: QueryKey,
		updater: (oldData: PostModel | undefined) => PostModel | undefined
	) => void
>

type ReturnUseQueryClient = ReturnHookMocked<typeof useQueryClient>

const mockSetQueryData = jest.fn()
const mockCancelQueries = jest.fn()
const mockInvalidateQueries = jest.fn()
const mockGetQueryData = jest.fn()

const mockReturnUseQueryClient: ReturnUseQueryClient = {
	setQueryData: mockSetQueryData,
	invalidateQueries: mockInvalidateQueries,
	cancelQueries: mockCancelQueries,
	getQueryData: mockGetQueryData,
}

jest.mock<{ useQueryClient: () => typeof mockReturnUseQueryClient }>(
	'@tanstack/react-query',
	() => ({
		...jest.requireActual('@tanstack/react-query'),
		useQueryClient: () => mockReturnUseQueryClient,
	})
)

describe('useInvalidateQueryPosts', () => {
	const mockPosts = [generatePost()]
	const postId = mockPosts[0]!.id

	beforeEach(() => {
		mockGetQueryData.mockReturnValue(undefined)
	})

	it('should invalidate favorites query', async () => {
		const { result } = renderHook(useInvalidateQueryPosts)

		await act(async () => {
			await result.current.invalidateQueryFavorites()
		})

		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			exact: true,
			queryKey: [AppQueryKeys.FAVORITES],
		})
	})

	it('should invalidate posts query', async () => {
		const { result } = renderHook(useInvalidateQueryPosts)

		await act(async () => {
			await result.current.invalidateQueryPosts()
		})

		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			exact: true,
			queryKey: [AppQueryKeys.POSTS],
		})
	})

	it('should cancel posts query', async () => {
		const { result } = renderHook(useInvalidateQueryPosts)

		await act(async () => {
			await result.current.cancelQueryPosts()
		})

		expect(mockCancelQueries).toHaveBeenCalledWith({
			exact: true,
			queryKey: [AppQueryKeys.POSTS],
		})
	})

	describe('updatePostCommentCount', () => {
		it('should update comment count correctly when incrementing', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.commentCount).toBe(
						mockPosts[0]!.commentCount + 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostCommentCount(postId, 'increment')
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should update comment count correctly when decrementing', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.commentCount).toBe(
						mockPosts[0]!.commentCount - 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostCommentCount(postId, 'decrement')
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should not update posts if no matching post is found', async () => {
			const nonExistentPostId = 'non-existent-id'

			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(
					key: QueryKey,
					updater: (
						oldData: InfiniteData<PageApp<PostModel>, unknown>
					) => InfiniteData<PageApp<PostModel>, unknown> | undefined
				) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data).toEqual(mockPosts)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostCommentCount(nonExistentPostId, 'increment')
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should return undefined if oldData is not defined', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(key, updater) => {
					const result = updater(undefined)
					expect(result).toBeUndefined()
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostCommentCount('mock-post-id', 'increment')
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})
	})

	describe('updatePostReactionCount', () => {
		it('should only update infinite posts query when post by id data is not available', async () => {
			const mockPost = generatePost()

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					mockPost.id,
					PostReactionType.FAVORITE,
					'increment'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledTimes(1)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should update infinite posts and post by id query', async () => {
			const mockPost = generatePost()

			mockGetQueryData.mockReturnValue(mockPost)
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(key, updater) => {
					if (key[0] === AppQueryKeys.POSTS) {
						const updatedData = updater({
							pages: [{ data: [mockPost], meta: mockMetaPaginationApp }],
							pageParams: [1],
						})
						expect(updatedData?.pages[0]!.data[0]!.favoriteCount).toBe(
							mockPost.favoriteCount + 1
						)
					}
				}
			)
			;(mockSetQueryData as MockSetQueryData).mockImplementation(
				(key, updater) => {
					if (key[0] === AppQueryKeys.POSTS_BY_ID) {
						const updatedPost = updater(mockPost)
						expect(updatedPost?.favoriteCount).toBe(mockPost.favoriteCount + 1)
					}
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					mockPost.id,
					PostReactionType.FAVORITE,
					'increment'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledTimes(2)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS_BY_ID, mockPost.id],
				expect.any(Function)
			)
		})

		it('should update favorite count correctly when incrementing', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(_key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.favoriteCount).toBe(
						mockPosts[0]!.favoriteCount + 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					postId,
					PostReactionType.FAVORITE,
					'increment'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should update favorite count correctly when decrementing', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(_key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.favoriteCount).toBe(
						mockPosts[0]!.favoriteCount - 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					postId,
					PostReactionType.FAVORITE,
					'decrement'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should update reaction count correctly when incrementing non-favorite reaction', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(_key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.reactionCount).toBe(
						mockPosts[0]!.reactionCount + 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					postId,
					PostReactionType.LIKE,
					'increment'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})

		it('should update reaction count correctly when decrementing non-favorite reaction', async () => {
			;(mockSetQueryData as MockSetQueryInfinityData).mockImplementation(
				(_key, updater) => {
					const updatedData = updater({
						pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
						pageParams: [1],
					})
					expect(updatedData?.pages[0]!.data[0]!.reactionCount).toBe(
						mockPosts[0]!.reactionCount - 1
					)
				}
			)

			const { result } = renderHook(useInvalidateQueryPosts)

			await act(() => {
				result.current.updatePostReactionCount(
					postId,
					PostReactionType.LIKE,
					'decrement'
				)
			})

			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.POSTS],
				expect.any(Function)
			)
		})
	})
})
