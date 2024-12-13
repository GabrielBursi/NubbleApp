import { act, renderHook, waitFor } from '@testing-library/react-native'

import { PostServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { mockPostsAPI } from '@/tests/mocks'

import { usePostList } from './usePostList'

describe('usePostList', () => {
	const getAllWithPagination = jest.spyOn(PostServices, 'GetAllWithPagination')

	it('should call post service correctly', async () => {
		renderHook(usePostList, { wrapper: TestProvider })
		await act(async () => {
			await waitFor(() => {
				expect(getAllWithPagination).toHaveBeenCalled()
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
