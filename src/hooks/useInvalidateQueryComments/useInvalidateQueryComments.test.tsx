import { InfiniteData, QueryKey } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-native'

import { PostModel } from '@/domain/Post'
import { generatePost, mockMetaPaginationApp } from '@/tests/mocks'
import { AppQueryKeys } from '@/types/api'
import { PageApp } from '@/types/shared'

import { useInvalidateQueryComments } from './useInvalidateQueryComments'

type MockSetQueryData = jest.MockedFunction<
	(
		key: QueryKey,
		updater: (
			oldData: InfiniteData<PageApp<PostModel>> | undefined
		) => InfiniteData<PageApp<PostModel>> | undefined
	) => void
>

const mockSetQueryData: MockSetQueryData = jest.fn()
const mockInvalidateQueries = jest.fn()

const mockReturnUseQueryClient = {
	setQueryData: mockSetQueryData,
	invalidateQueries: mockInvalidateQueries,
}

jest.mock<{ useQueryClient: () => typeof mockReturnUseQueryClient }>(
	'@tanstack/react-query',
	() => ({
		...jest.requireActual('@tanstack/react-query'),
		useQueryClient: () => mockReturnUseQueryClient,
	})
)

describe('useInvalidateQueryComments', () => {
	const mockPostId = generatePost().id

	it('should invalidate comments query', async () => {
		const { result } = renderHook(useInvalidateQueryComments)

		await act(async () => {
			await result.current.invalidateQueryComments(mockPostId)
		})

		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			exact: true,
			queryKey: [AppQueryKeys.COMMENTS, mockPostId],
		})
	})

	it('should update comment count correctly when incrementing', async () => {
		const mockPosts = [generatePost()]
		const postId = mockPosts[0]!.id

		mockSetQueryData.mockImplementation((key, updater) => {
			const updatedData = updater({
				pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
				pageParams: [1],
			})
			expect(updatedData?.pages[0]!.data[0]!.commentCount).toBe(
				mockPosts[0]!.commentCount + 1
			)
		})

		const { result } = renderHook(useInvalidateQueryComments)

		await act(() => {
			result.current.invalidateCommentCountPost(postId, 'increment')
		})

		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.POSTS],
			expect.any(Function)
		)
	})

	it('should update comment count correctly when decrementing', async () => {
		const mockPosts = [generatePost()]
		const postId = mockPosts[0]!.id

		mockSetQueryData.mockImplementation((key, updater) => {
			const updatedData = updater({
				pages: [{ data: mockPosts, meta: mockMetaPaginationApp }],
				pageParams: [1],
			})
			expect(updatedData?.pages[0]!.data[0]!.commentCount).toBe(
				mockPosts[0]!.commentCount - 1
			)
		})

		const { result } = renderHook(useInvalidateQueryComments)

		await act(() => {
			result.current.invalidateCommentCountPost(postId, 'decrement')
		})

		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.POSTS],
			expect.any(Function)
		)
	})

	it('should not update posts if no matching post is found', async () => {
		const mockPosts = [generatePost()]
		const nonExistentPostId = 'non-existent-id'

		mockSetQueryData.mockImplementation(
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

		const { result } = renderHook(useInvalidateQueryComments)

		await act(() => {
			result.current.invalidateCommentCountPost(nonExistentPostId, 'increment')
		})

		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.POSTS],
			expect.any(Function)
		)
	})

	it('should return undefined if oldData is not defined', async () => {
		mockSetQueryData.mockImplementation((key, updater) => {
			const result = updater(undefined)
			expect(result).toBeUndefined()
		})

		const { result } = renderHook(useInvalidateQueryComments)

		await act(() => {
			result.current.invalidateCommentCountPost('mock-post-id', 'increment')
		})

		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.POSTS],
			expect.any(Function)
		)
	})
})
