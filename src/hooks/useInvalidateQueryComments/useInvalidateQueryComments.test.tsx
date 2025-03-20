import { InfiniteData, QueryKey } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-native'

import { PostModel } from '@/domain/Post'
import { generatePost } from '@/tests/mocks'
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
})
