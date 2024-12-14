import {
	act,
	fireEvent,
	screen,
	userEvent,
} from '@testing-library/react-native'

import { usePostList } from '@/domain/Post/useCases/usePostList/usePostList'
import { mockPosts } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FeedList } from './FeedList'

type UsePostList = typeof usePostList
type ReturnUsePostList = ReturnHookMocked<UsePostList>
type MockUsePostList = HookMocked<UsePostList>

jest.mock('@/domain/Post/useCases/usePostList/usePostList')

describe('<FeedList/>', () => {
	const mockFetchMorePostsWithPagination = jest.fn()
	const mockRefreshPosts = jest.fn()

	const initialMockReturnUsePostList: ReturnUsePostList = {
		error: null,
		loading: false,
		posts: [],
		fetchMorePostsWithPagination: mockFetchMorePostsWithPagination,
		refreshPosts: mockRefreshPosts,
	}

	beforeEach(() => {
		;(usePostList as MockUsePostList).mockReturnValue(
			initialMockReturnUsePostList
		)
	})

	it('should render the list component', () => {
		customRender(<FeedList />)
		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render list empty correctly', () => {
		customRender(<FeedList />)
		expect(
			screen.getByText(/Não há publicações no seu feed/i)
		).toBeOnTheScreen()
	})

	it('should render posts when data is available', async () => {
		;(usePostList as MockUsePostList).mockReturnValue({
			...initialMockReturnUsePostList,
			posts: [mockPosts[0], mockPosts[1]],
		})

		customRender(<FeedList />)

		await act(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
		})
	})

	it('should render loading indicator when loading is true', () => {
		;(usePostList as MockUsePostList).mockReturnValue({
			...initialMockReturnUsePostList,
			loading: true,
		})

		customRender(<FeedList />)

		expect(screen.getByLabelText(/loading/i)).toBeOnTheScreen()
	})

	it('should display error message when there is an error', () => {
		;(usePostList as MockUsePostList).mockReturnValue({
			...initialMockReturnUsePostList,
			error: { message: 'Error' },
		})

		customRender(<FeedList />)

		expect(
			screen.getByText(/Não foi possível carregar o feed 😢/i)
		).toBeOnTheScreen()
	})

	it('should call refetch when FeedEmpty refetch button is pressed', async () => {
		;(usePostList as MockUsePostList).mockReturnValue({
			...initialMockReturnUsePostList,
			error: { message: 'Error' },
		})

		customRender(<FeedList />)

		const refetchButton = screen.getByText(/recarregar/i)
		await userEvent.press(refetchButton)

		expect(mockRefreshPosts).toHaveBeenCalled()
	})

	it('should call fetch new page correctly', async () => {
		customRender(<FeedList />)

		await userEvent.scrollTo(screen.getByRole('list'), { y: 1000 })

		expect(mockFetchMorePostsWithPagination).toHaveBeenCalled()
	})

	it('should call refresh post correctly', () => {
		customRender(<FeedList />)

		const list = screen.getByRole('list')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const refreshControl = list.props.refreshControl
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		fireEvent(refreshControl, 'onRefresh')

		expect(mockRefreshPosts).toHaveBeenCalled()
	})
})
