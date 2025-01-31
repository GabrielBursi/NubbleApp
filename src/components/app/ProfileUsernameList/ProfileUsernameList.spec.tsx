import { screen, userEvent } from '@testing-library/react-native'

import { useSearchHistoryService } from '@/services/searchHistory/useSearchHistory'
import { mockUsers } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ProfileUsernameList } from './ProfileUsernameList'

type UseSearchHistoryService = typeof useSearchHistoryService
type MockUseSearchHistoryService = HookMocked<UseSearchHistoryService>
type ReturnUseSearchHistoryService = ReturnHookMocked<UseSearchHistoryService>

jest.mock('@/services/searchHistory/useSearchHistory')

describe('<ProfileUsernameList/>', () => {
	const mockOnPressProfileItem = jest.fn()
	const mockRemoveUser = jest.fn()

	const mockUseSearchHistoryService: ReturnUseSearchHistoryService = {
		removeUser: mockRemoveUser,
	}

	beforeEach(() => {
		;(useSearchHistoryService as MockUseSearchHistoryService).mockReturnValue(
			mockUseSearchHistoryService
		)
	})

	it('should render the list correctly', () => {
		customRender(<ProfileUsernameList />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the user item correctly', () => {
		customRender(<ProfileUsernameList users={mockUsers} />)

		expect(screen.getByText(mockUsers[0].username)).toBeOnTheScreen()
	})

	it('should press the user item correctly', async () => {
		customRender(
			<ProfileUsernameList
				users={mockUsers}
				onPressProfileItem={mockOnPressProfileItem}
			/>
		)

		await userEvent.press(screen.getByText(mockUsers[0].username))
		expect(mockOnPressProfileItem).toHaveBeenCalledWith(mockUsers[0])
	})

	it('should remove the user from history correctly', async () => {
		customRender(
			<ProfileUsernameList
				users={[mockUsers[0]]}
				onPressProfileItem={mockOnPressProfileItem}
			/>
		)

		await userEvent.press(screen.getByRole('img', { name: 'trash' }))
		expect(mockRemoveUser).toHaveBeenCalledWith(mockUsers[0].id)
	})
})
