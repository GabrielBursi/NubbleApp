import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { TestProvider } from '@/providers'

import { useDeleteComment } from './useDeleteComment'

describe('useDeleteComment', () => {
	const spyDeleteComment = jest.spyOn(CommentApi, 'DeleteComment')

	it('should create a comment correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(spyDeleteComment).toHaveBeenCalledWith(1)
		})
	})

	it('should return the comment create correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(result.current.message).toBeTruthy()
		})
	})
})
