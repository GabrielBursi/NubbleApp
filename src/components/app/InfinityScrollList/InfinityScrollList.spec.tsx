import { View } from 'react-native'

import { ListRenderItem } from '@shopify/flash-list'
import {
	fireEvent,
	screen,
	userEvent,
	waitFor,
} from '@testing-library/react-native'

import { PostModel } from '@/domain/Post'
import { usePaginatedList } from '@/hooks/usePaginatedList/usePaginatedList'
import { generateMockMetaPaginationApp, generatePost } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { PageApp } from '@/types/shared'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { InfinityScrollList } from './InfinityScrollList'

type UsePaginatedList = typeof usePaginatedList<PostModel>
type ReturnUsePaginatedList = ReturnHookMocked<UsePaginatedList>
type MockUsePaginatedList = HookMocked<UsePaginatedList>

jest.mock('@/hooks/usePaginatedList/usePaginatedList')

describe('<InfinityScrollList/>', () => {
	const mockFetchNextPage = jest.fn()
	const mockRefreshList = jest.fn()
	const mockRenderItem: ListRenderItem<PostModel> = ({ item }) => (
		<View accessible role="listitem">
			{item.id}
		</View>
	)

	const mockItems = [
		{ id: '1', name: 'Item 1' },
		{ id: '2', name: 'Item 2' },
	]

	const initialMockReturnUsePaginatedList: ReturnUsePaginatedList = {
		error: null,
		isLoading: false,
		list: [],
		fetchNextPage: mockFetchNextPage,
		refreshList: mockRefreshList,
	}

	beforeEach(() => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue(
			initialMockReturnUsePaginatedList
		)
	})

	const mockGetList = async (): Promise<PageApp<PostModel>> => {
		await new Promise((res) => setTimeout(res, 1000))
		return {
			data: [
				generatePost(),
				generatePost(),
				generatePost(),
				generatePost(),
				generatePost(),
				generatePost(),
			],
			meta: generateMockMetaPaginationApp(),
		}
	}

	it('should render the list component', () => {
		customRender(
			<InfinityScrollList
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={() => null}
				estimatedItemSize={50}
				accessibilityLabel="test"
				keyExtractor={({ id }, index) => `${id}-${index}`}
			/>
		)
		expect(screen.getByRole('list', { name: 'test' })).toBeOnTheScreen()
	})

	it('should render list empty correctly with empty message', () => {
		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={() => null}
				estimatedItemSize={50}
				emptyMessage="No items available"
			/>
		)
		expect(screen.getByText(/No items available/i)).toBeOnTheScreen()
	})

	it('should render items when data is available', async () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			list: mockItems,
		})

		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
			/>
		)

		await waitFor(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2)
		})
	})

	it('should render loading indicator when loading is true', () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			isLoading: true,
		})

		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
			/>
		)

		expect(screen.getByLabelText(/loading/i)).toBeOnTheScreen()
	})

	it('should display error message when there is an error', () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			isError: true,
		})

		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
				errorMessage="Failed to load items"
			/>
		)

		expect(screen.getByText(/Failed to load items/i)).toBeOnTheScreen()
	})

	it('should call refetch when EmptyList refetch button is pressed', async () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			isError: true,
		})

		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
				errorMessage="Failed to load items"
			/>
		)

		const refetchButton = screen.getByText(/recarregar/i)
		await userEvent.press(refetchButton)

		expect(mockRefreshList).toHaveBeenCalled()
	})

	it('should call fetchNextPage correctly when reaching end of list', async () => {
		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
			/>
		)

		await userEvent.scrollTo(screen.getByRole('list'), { y: 1000 })

		expect(mockFetchNextPage).toHaveBeenCalled()
	})

	it('should call refreshList correctly with pull-to-refresh', () => {
		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={{
					queryKey: ['test'],
				}}
				renderItem={mockRenderItem}
				estimatedItemSize={50}
			/>
		)

		const list = screen.getByRole('list')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const refreshControl = list.props.refreshControl
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		fireEvent(refreshControl, 'onRefresh')

		expect(mockRefreshList).toHaveBeenCalled()
	})

	it('should pass the queryOpt and getList to usePaginatedList hook', () => {
		const queryOpt = { enabled: true, staleTime: 5000, queryKey: ['test'] }

		customRender(
			<InfinityScrollList
				keyExtractor={({ id }, index) => `${id}-${index}`}
				accessibilityLabel="test"
				getList={mockGetList}
				queryOpt={queryOpt}
				renderItem={() => null}
				estimatedItemSize={50}
			/>
		)

		expect(usePaginatedList).toHaveBeenCalledWith(mockGetList, queryOpt)
	})
})
