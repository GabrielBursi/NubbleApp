import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { TestProvider } from '@/providers'

import { useCreateComment } from './useCreateComment'

describe('useCreateComment', () => {
	const spySendComment = jest.spyOn(CommentApi, 'SendComment')

	it('should create a comment correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: 1 })
		})
		await waitFor(() => {
			expect(spySendComment).toHaveBeenCalledWith(1, 'jest')
		})
	})

	it('should return the comment create correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: 1 })
		})
		await waitFor(() => {
			expect(result.current.createdComment).toBeTruthy()
		})
	})
})
