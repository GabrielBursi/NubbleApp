import { act, renderHook, waitFor } from '@testing-library/react-native'

import { PostServices } from '@/api/services'
import { PostApi } from '@/domain/Post'
import { TestProvider } from '@/providers'
import { mockPostsAPI } from '@/tests/mocks'

import { usePaginatedList } from './usePaginatedList'

describe('usePaginatedList', () => {
	const getAllWithPagination = jest.spyOn(PostServices, 'GetAllWithPagination')

	it('should call service with initial pagination correctly', async () => {
		renderHook(() => usePaginatedList(PostApi.GetPosts, 'list'), {
			wrapper: TestProvider,
		})
		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})
	})

	it('should fetch a new page of data list correctly', async () => {
		const { result } = renderHook(
			() => usePaginatedList(PostApi.GetPosts, 'list'),
			{
				wrapper: TestProvider,
			}
		)

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await act(() => {
			result.current.fetchMoreDataWithPagination()
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

	it('should refresh list correctly', async () => {
		const { result } = renderHook(
			() => usePaginatedList(PostApi.GetPosts, 'list'),
			{
				wrapper: TestProvider,
			}
		)

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await act(() => {
			result.current.fetchMoreDataWithPagination()
		})

		await act(() => {
			result.current.refreshList()
		})

		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledTimes(3)
			})
		})
	})

	it('should return the list correctly', async () => {
		const { result } = renderHook(
			() => usePaginatedList(PostApi.GetPosts, 'list'),
			{
				wrapper: TestProvider,
			}
		)
		await waitFor(() => {
			expect(result.current.listData).toHaveLength(mockPostsAPI.length)
		})
	})
})
