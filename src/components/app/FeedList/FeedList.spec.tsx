import {
	act,
	fireEvent,
	screen,
	userEvent,
} from '@testing-library/react-native'

import { PostApi } from '@/domain/Post'
import { usePaginatedList } from '@/hooks/usePaginatedList/usePaginatedList'
import { mockPosts } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { AppQueryKeys } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FeedList } from './FeedList'

type UsePaginatedList = typeof usePaginatedList
type ReturnUsePaginatedList = ReturnHookMocked<UsePaginatedList>
type MockUsePaginatedList = HookMocked<UsePaginatedList>

jest.mock('@/hooks/usePaginatedList/usePaginatedList')

describe('<FeedList/>', () => {
	const mockFetchMorePostsWithPagination = jest.fn()
	const mockRefreshPosts = jest.fn()

	const spyGetPosts = jest.spyOn(PostApi, 'GetPosts')

	const initialMockReturnUsePaginatedList: ReturnUsePaginatedList = {
		error: null,
		isLoading: false,
		list: [],
		fetchNextPage: mockFetchMorePostsWithPagination,
		refreshList: mockRefreshPosts,
	}

	beforeEach(() => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue(
			initialMockReturnUsePaginatedList
		)
	})

	it('should render the list component', () => {
		customRender(<FeedList />)
		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should call the hook correctly', () => {
		customRender(<FeedList />)

		expect(usePaginatedList).toHaveBeenCalledWith(spyGetPosts, {
			queryKey: [AppQueryKeys.POSTS],
		})
	})

	it('should render list empty correctly', () => {
		customRender(<FeedList />)
		expect(
			screen.getByText(/Não há publicações no seu feed/i)
		).toBeOnTheScreen()
	})

	it('should render posts when data is available', async () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			list: [mockPosts[0], mockPosts[1]],
		})

		customRender(<FeedList />)

		await act(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
		})
	})

	it('should render loading indicator when loading is true', () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			isLoading: true,
		})

		customRender(<FeedList />)

		expect(screen.getByLabelText(/loading/i)).toBeOnTheScreen()
	})

	it('should display error message when there is an error', () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			error: 'Error',
		})

		customRender(<FeedList />)

		expect(
			screen.getByText(/Não foi possível carregar o feed 😢/i)
		).toBeOnTheScreen()
	})

	it('should call refetch when FeedEmpty refetch button is pressed', async () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			error: 'Error',
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
