import { screen, userEvent } from '@testing-library/react-native'

import { mockUsers } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileUsernameList } from './ProfileUsernameList'

describe('<ProfileUsernameList/>', () => {
	const mockOnPressProfileItem = jest.fn()
	const mockOnRemoveProfileItem = jest.fn()

	it('should render the list correctly', () => {
		customRender(<ProfileUsernameList />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the list with title correctly', () => {
		customRender(<ProfileUsernameList headerTitle="jest" />)

		expect(screen.getByRole('text', { name: 'jest' })).toBeOnTheScreen()
	})

	it('should render the user item correctly', () => {
		customRender(<ProfileUsernameList users={mockUsers} />)

		expect(screen.getByText(mockUsers[0]!.username)).toBeOnTheScreen()
	})

	it('should press the user item correctly', async () => {
		customRender(
			<ProfileUsernameList
				users={mockUsers}
				onPressProfileItem={mockOnPressProfileItem}
			/>
		)

		await userEvent.press(screen.getByText(mockUsers[0]!.username))
		expect(screen.queryByRole('img', { name: 'trash' })).not.toBeOnTheScreen()
		expect(mockOnPressProfileItem).toHaveBeenCalledWith(mockUsers[0]!)
	})

	it('should remove the user from history correctly', async () => {
		customRender(
			<ProfileUsernameList
				users={[mockUsers[0]!]}
				onRemoveProfileItem={mockOnRemoveProfileItem}
			/>
		)

		await userEvent.press(screen.getByRole('img', { name: 'trash' }))
		expect(mockOnRemoveProfileItem).toHaveBeenCalledWith(mockUsers[0]!)
	})
})
