import { renderHook, waitFor } from '@testing-library/react-native'

import { PostServices } from '@/api/services'
import { TestProvider } from '@/providers'
import { mockPostsAPI } from '@/tests/mocks'

import { usePostGetById } from './usePostGetById'

describe('usePostGetById', () => {
	const mockPostId = mockPostsAPI[0]!.id.toString()

	const spyGetPostId = jest.spyOn(PostServices, 'GetById')

	it('should not fetch the post without post id', async () => {
		const { result } = renderHook(() => usePostGetById(), {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(spyGetPostId).not.toHaveBeenCalled()
		})

		expect(result.current.post).toBeNull()
		expect(result.current.error).toBeNull()
	})

	it('should fetch the post with post id', async () => {
		const { result } = renderHook(() => usePostGetById(mockPostId), {
			wrapper: TestProvider,
		})

		await waitFor(() => {
			expect(spyGetPostId).toHaveBeenCalledWith(mockPostId)
		})

		await waitFor(() => {
			expect(result.current.post).toBeTruthy()
		})
	})
})
