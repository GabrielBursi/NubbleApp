import { screen, userEvent } from '@testing-library/react-native'

import { mockComments } from '@/tests/mocks'
import { customAct, customFaker, customRender } from '@/tests/utils'
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
		isLoading: false,
		comments: [],
		fetchMoreComments: mockFetchMoreCommentsWithPagination,
		refreshComments: mockRefreshComments,
		hasNextPage: false,
	}

	beforeEach(() => {
		;(useCommentList as MockUseCommentList).mockReturnValue(
			initialMockReturnUseCommentList
		)
	})

	it('should render the list component', () => {
		customRender(<CommentList id={mockId} authorId={mockId} />)
		expect(screen.getByRole('list')).toBeOnTheScreen()
		expect(
			screen.getByPlaceholderText('Adicione um comentário', { exact: true })
		).toBeOnTheScreen()
	})

	it('should render comments when data is available', async () => {
		;(useCommentList as MockUseCommentList).mockReturnValue({
			...initialMockReturnUseCommentList,
			comments: [mockComments[0], mockComments[1]],
		})

		const { debug } = customRender(
			<CommentList id={mockId} authorId={mockId} />
		)

		debug()

		await customAct(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(1)
		})
	})

	it('should show more comments correctly', async () => {
		;(useCommentList as MockUseCommentList).mockReturnValue({
			...initialMockReturnUseCommentList,
			hasNextPage: true,
		})

		customRender(<CommentList id={mockId} authorId={mockId} />)

		await userEvent.press(screen.getByRole('text', { name: /ver mais/i }))

		expect(mockFetchMoreCommentsWithPagination).toHaveBeenCalled()
	})
})
