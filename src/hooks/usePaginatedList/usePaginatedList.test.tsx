import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostServices } from '@/api/services'
import { PostApi, PostAPIModel } from '@/domain/Post'
import { TestProvider } from '@/providers'
import { mockMetaPaginationApi, mockPostsAPI } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { customAct } from '@/tests/utils'
import { END_POINTS_API, PageAPI } from '@/types/api'

import { usePaginatedList } from './usePaginatedList'

describe('usePaginatedList', () => {
	const getAllWithPagination = jest.spyOn(PostServices, 'GetAllWithPagination')

	it('should call service with initial pagination correctly', async () => {
		renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)
		await customAct(async () => {
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
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await customAct(async () => {
			await result.current.fetchNextPage()
		})

		await customAct(async () => {
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
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await customAct(async () => {
			await result.current.fetchNextPage()
		})

		await customAct(async () => {
			await result.current.refreshList()
		})

		await customAct(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledTimes(4)
			})
		})
	})

	it('should return the list correctly', async () => {
		const { result } = renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)
		await waitFor(() => {
			expect(result.current.list).toHaveLength(mockPostsAPI.length)
			expect(result.current.error).toBeNull()
		})
	})

	it('should return the error correctly', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.error()
				),
			]
		)

		const { result } = renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await waitFor(() => {
			expect(result.current.error).toBeTruthy()
			expect(result.current.list).toHaveLength(0)
		})
	})

	it('should return when is the last page correctly', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.json<PageAPI<PostAPIModel>>(
						{
							data: mockPostsAPI,
							meta: {
								...mockMetaPaginationApi,
								next_page_url: null,
							},
						},
						{ status: 200 }
					)
				),
			]
		)

		const { result } = renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalledWith({
					page: 1,
					per_page: 5,
				})
			})
		})

		await customAct(async () => {
			await result.current.fetchNextPage()
		})

		await waitFor(() => {
			expect(result.current.hasNextPage).toBe(false)
		})
	})

	it('should return null on refetch with error correctly', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.error()
				),
			]
		)

		const { result } = renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(async () => {
			const data = await result.current.refreshList()
			expect(data).toBeNull()
		})
	})

	it('should return null on fetch next page with error correctly', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.error()
				),
			]
		)

		const { result } = renderHook(
			() =>
				usePaginatedList(PostApi.GetPosts, {
					queryKey: ['list'],
					enabled: true,
				}),
			{
				wrapper: TestProvider,
			}
		)

		await customAct(async () => {
			const data = await result.current.fetchNextPage()
			expect(data).toBeNull()
		})
	})
})
