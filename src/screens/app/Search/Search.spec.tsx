import { screen, userEvent, waitFor } from '@testing-library/react-native'

import { UserServices } from '@/api/services'
import { useSearchHistory } from '@/services/searchHistory/useSearchHistory'
import { mockUsers, mockUsersApi } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked } from '@/types/tests'

import { SearchScreen } from './Search'

type UseSearchHistory = typeof useSearchHistory
type MockUseSearchHistory = HookMocked<UseSearchHistory>

jest.mock('@/services/searchHistory/useSearchHistory')

describe('<SearchScreen/>', () => {
	const spyGetUsers = jest.spyOn(UserServices, 'GetAllWithPagination')

	beforeEach(() => {
		;(useSearchHistory as MockUseSearchHistory).mockReturnValue([])
	})

	it('should render the search screen correctly', () => {
		customRender(<SearchScreen />)

		expect(
			screen.getByPlaceholderText('Procure usuários aqui', { exact: true })
		).toBeEnabled()
		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the search screen with search history correctly', () => {
		;(useSearchHistory as MockUseSearchHistory).mockReturnValue(mockUsers)

		customRender(<SearchScreen />)

		expect(
			screen.getByText('Buscas recentes', { exact: true })
		).toBeOnTheScreen()
		expect(screen.getByText(mockUsers[0].username)).toBeOnTheScreen()
	})

	it('should search users correctly', async () => {
		customRender(<SearchScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('Procure usuários aqui', { exact: true }),
			mockUsersApi[0].username
		)

		await waitFor(() => {
			expect(spyGetUsers).toHaveBeenCalledWith(mockUsersApi[0].username)
		})

		await waitFor(() => {
			expect(screen.getByText(mockUsersApi[0].username)).toBeOnTheScreen()
		})

		await waitFor(() => {
			expect(screen.getAllByRole('text')).toHaveLength(1)
		})

		await waitFor(() => {
			expect(
				screen.queryByText('Buscas recentes', { exact: true })
			).not.toBeOnTheScreen()
		})
	})
})
