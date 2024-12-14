import { act, renderHook, waitFor } from '@testing-library/react-native'

import { PostServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { mockPostsAPI } from '@/tests/mocks'

import { usePostList } from './usePostList'

describe('usePostList', () => {
	const getAllWithPagination = jest.spyOn(PostServices, 'GetAllWithPagination')

	it('should call post service with initial pagination correctly', async () => {
		renderHook(usePostList, { wrapper: TestProvider })
		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})
	})

	it('should fetch a new page of posts correctly', async () => {
		const { result } = renderHook(usePostList, { wrapper: TestProvider })

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await act(() => {
			result.current.fetchMorePostsWithPagination()
		})

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 2,
					per_page: 5,
				})
			})
		})
	})

	it('should refresh posts correctly', async () => {
		const { result } = renderHook(usePostList, { wrapper: TestProvider })

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await act(() => {
			result.current.fetchMorePostsWithPagination()
		})

		await act(() => {
			result.current.refreshPosts()
		})

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledTimes(3)
			})
		})
	})

	it('should return the posts correctly', async () => {
		const { result } = renderHook(usePostList, { wrapper: TestProvider })
		await waitFor(() => {
			expect(result.current.posts).toHaveLength(mockPostsAPI.length)
		})
	})
})
