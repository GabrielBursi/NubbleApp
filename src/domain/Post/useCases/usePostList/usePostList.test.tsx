import { renderHook } from '@testing-library/react-native'

import { PostApi } from '@/domain/Post'
import { AppQueryKeys } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { usePaginatedList } from '../../../../hooks/usePaginatedList/usePaginatedList'

import { usePostList } from './usePostList'

type UsePaginatedList = typeof usePaginatedList
type ReturnUsePaginatedList = ReturnHookMocked<UsePaginatedList>
type UsePaginatedListMocked = HookMocked<UsePaginatedList>

jest.mock('../../../../hooks/usePaginatedList/usePaginatedList')

describe('usePostList', () => {
	const initialMock: ReturnUsePaginatedList = {
		error: null,
		fetchNextPage: jest.fn(),
		list: [],
		isLoading: false,
		refreshList: jest.fn(),
	}

	beforeEach(() => {
		;(usePaginatedList as UsePaginatedListMocked).mockReturnValue(initialMock)
	})

	it('should call usePaginatedList with service get posts correctly', () => {
		renderHook(usePostList)

		expect(usePaginatedList).toHaveBeenCalledWith(PostApi.GetPosts, {
			queryKey: [AppQueryKeys.POSTS],
		})
	})
})
