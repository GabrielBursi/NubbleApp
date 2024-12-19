import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi, useCommentList } from '@/domain/Comment'
import { TestProvider } from '@/providers'

describe('useCommentList', () => {
	const spyGetComments = jest.spyOn(CommentApi, 'GetComments')

	it('should call usePaginatedList with service get comments correctly', async () => {
		renderHook(() => useCommentList('1'), { wrapper: TestProvider })

		await act(async () => {
			await waitFor(() => {
				expect(spyGetComments).toHaveBeenCalledWith('1', 1)
			})
		})
	})
})
