import { screen, userEvent, waitFor } from '@testing-library/react-native'

import { UserServices } from '@/api/services'
import { mockUsersApi } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { SearchScreen } from './Search'

describe('<SearchScreen/>', () => {
	const spyGetUsers = jest.spyOn(UserServices, 'GetAllWithPagination')

	it('should render the search screen correctly', () => {
		customRender(<SearchScreen />)

		expect(
			screen.getByPlaceholderText('Procure usuários aqui', { exact: true })
		).toBeEnabled()
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
	})
})
