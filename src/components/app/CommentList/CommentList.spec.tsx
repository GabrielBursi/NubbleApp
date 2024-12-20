import { act, screen } from '@testing-library/react-native'

import { mockComments } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useCommentList } from '../../../domain/Comment/useCases/useCommentList/useCommentList'

import { CommentList } from './CommentList'

type UseCommentList = typeof useCommentList
type ReturnUseCommentList = ReturnHookMocked<UseCommentList>
type MockUseCommentList = HookMocked<UseCommentList>

jest.mock('../../../domain/Comment/useCases/useCommentList/useCommentList')

describe('<CommentList/>', () => {
	const mockId = customFaker.string.uuid()
	const mockFetchMoreCommentsWithPagination = jest.fn()
	const mockRefreshComments = jest.fn()

	const initialMockReturnUseCommentList: ReturnUseCommentList = {
		error: null,
		loading: false,
		comments: [],
		fetchMoreCommentsWithPagination: mockFetchMoreCommentsWithPagination,
		refreshComments: mockRefreshComments,
	}

	beforeEach(() => {
		;(useCommentList as MockUseCommentList).mockReturnValue(
			initialMockReturnUseCommentList
		)
	})

	it('should render the list component', () => {
		customRender(<CommentList id={mockId} />)
		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render comments when data is available', async () => {
		;(useCommentList as MockUseCommentList).mockReturnValue({
			...initialMockReturnUseCommentList,
			comments: [mockComments[0], mockComments[1]],
		})

		customRender(<CommentList id={mockId} />)

		await act(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
		})
	})
})
