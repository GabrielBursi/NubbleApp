import { Alert } from 'react-native'

import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { TestProvider } from '@/providers'
import { generateComment } from '@/tests/mocks'

import { useDeleteComment } from './useDeleteComment'

describe('useDeleteComment', () => {
	const spyDeleteComment = jest.spyOn(CommentApi, 'DeleteComment')
	const spyAlert = jest.spyOn(Alert, 'alert')
	const mockConfirmDelete = jest.fn()
	const mockComment = generateComment()

	it('should delete a comment correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(spyDeleteComment).toHaveBeenCalledWith(1)
		})
	})

	it('should return the message of comment deleted correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.deleteComment(1)
		})
		await waitFor(() => {
			expect(result.current.message).toBeTruthy()
		})
	})

	it('should confirm to delete correctly', async () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		await act(() => {
			result.current.confirmDelete(mockConfirmDelete)
		})

		expect(spyAlert).toHaveBeenCalled()
	})

	it("should allow to delete when is post's user correctly", () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		expect(
			result.current.isAllowedToDelete(
				mockComment,
				mockComment.author.id,
				mockComment.author.id
			)
		).toBe(true)
	})

	it("should allow to delete when is comments's user correctly", () => {
		const { result } = renderHook(useDeleteComment, { wrapper: TestProvider })

		expect(
			result.current.isAllowedToDelete(mockComment, mockComment.author.id, -55)
		).toBe(true)
	})
})
