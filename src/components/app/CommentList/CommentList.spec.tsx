import { act, screen, userEvent } from '@testing-library/react-native'

import { useCommentList } from '@/domain/Comment/useCases/useCommentList/useCommentList'
import { usePostGetById } from '@/domain/Post/useCases/usePostGetById/usePostGetById'
import { generatePost, mockComments } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { CommentList } from './CommentList'

type UseCommentList = typeof useCommentList
type ReturnUseCommentList = ReturnHookMocked<UseCommentList>
type MockUseCommentList = HookMocked<UseCommentList>

type UsePostGetById = typeof usePostGetById
type ReturnUsePostGetById = ReturnHookMocked<UsePostGetById>
type MockUsePostGetById = HookMocked<UsePostGetById>

jest.mock('@/domain/Comment/useCases/useCommentList/useCommentList')
jest.mock('@/domain/Post/useCases/usePostGetById/usePostGetById')

describe('<CommentList/>', () => {
	const mockId = customFaker.string.uuid()
	const mockFetchMoreCommentsWithPagination = jest.fn()
	const mockRefreshComments = jest.fn()

	const mockPost = generatePost()

	const initialMockReturnUseCommentList: ReturnUseCommentList = {
		error: null,
		isLoading: false,
		comments: [],
		fetchMoreComments: mockFetchMoreCommentsWithPagination,
		refreshComments: mockRefreshComments,
		hasNextPage: false,
	}

	const initialMockReturnUsePostGetById: ReturnUsePostGetById = {
		error: null,
		isLoading: false,
		post: null,
	}

	beforeEach(() => {
		;(useCommentList as MockUseCommentList).mockReturnValue(
			initialMockReturnUseCommentList
		)
		;(usePostGetById as MockUsePostGetById).mockReturnValue(
			initialMockReturnUsePostGetById
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

		customRender(<CommentList id={mockId} authorId={mockId} />)

		await act(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
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

	it('should render a post item as a header component correctly', () => {
		;(useCommentList as MockUseCommentList).mockReturnValue({
			...initialMockReturnUseCommentList,
			hasNextPage: true,
		})
		;(usePostGetById as MockUsePostGetById).mockReturnValue({
			...initialMockReturnUsePostGetById,
			post: mockPost,
		})

		customRender(<CommentList id={mockId} authorId={mockId} showPost />)

		expect(
			screen.getByRole('listitem', { name: mockPost.author.userName })
		).toBeOnTheScreen()
	})
})
