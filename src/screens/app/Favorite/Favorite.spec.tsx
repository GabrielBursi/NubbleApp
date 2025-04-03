import { screen, userEvent } from '@testing-library/react-native'

import {
	PostReactionApi,
	PostReactionModel,
	PostReactionType,
} from '@/domain/PostReaction'
import { usePaginatedList } from '@/hooks/usePaginatedList/usePaginatedList'
import { mockReactions, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { AppQueryKeys } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FavoriteScreen } from './Favorite'

type UsePaginatedList = typeof usePaginatedList<PostReactionModel>
type ReturnUsePaginatedList = ReturnHookMocked<UsePaginatedList>
type MockUsePaginatedList = HookMocked<UsePaginatedList>

jest.mock('@/hooks/usePaginatedList/usePaginatedList')

describe('<FavoriteScreen/>', () => {
	const spyGetReactions = jest.spyOn(PostReactionApi, 'GetMyReactions')
	const mockFetchNextPage = jest.fn()
	const mockRefreshList = jest.fn()

	const mockFavorites = mockReactions.filter(
		(r) => r.emojiType === PostReactionType.FAVORITE
	)

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

	it('should render the screen', () => {
		customRender(<FavoriteScreen />)

		expect(screen.getByRole('list', { name: /favorites/i })).toBeOnTheScreen()
	})

	it('should fetch favorites reactions correctly', () => {
		;(usePaginatedList as MockUsePaginatedList).mockImplementation(
			(getList: (page: number) => unknown) => {
				getList(1)
				return initialMockReturnUsePaginatedList
			}
		)

		customRender(<FavoriteScreen />)

		expect(spyGetReactions).toHaveBeenCalledWith(PostReactionType.FAVORITE, 1)

		expect(usePaginatedList).toHaveBeenCalledWith(expect.any(Function), {
			queryKey: [AppQueryKeys.FAVORITES],
		})
	})

	it('should render favorites itens correctly', () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			list: [mockFavorites[0]],
		})

		customRender(<FavoriteScreen />)

		expect(screen.getByTestId('favorite-item')).toBeOnTheScreen()
		expect(
			screen.getByRole('img', { name: mockFavorites[0]!.post.imageURL })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockFavorites[0]!.author.username })
		).toBeOnTheScreen()
	})

	it('should navigate to the comments screen', async () => {
		;(usePaginatedList as MockUsePaginatedList).mockReturnValue({
			...initialMockReturnUsePaginatedList,
			list: [mockFavorites[0]],
		})

		customRender(<FavoriteScreen />)

		await userEvent.press(screen.getAllByTestId('favorite-item')[0]!)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'PostCommentScreen',
			{
				postId: mockFavorites[0]!.post.id.toString(),
				postAuthorId: mockFavorites[0]!.author.id.toString(),
				showPost: true,
			}
		)
	})
})
