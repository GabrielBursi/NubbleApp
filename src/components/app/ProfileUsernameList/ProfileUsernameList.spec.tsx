import { screen } from '@testing-library/react-native'

import { mockUsers } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileUsernameList } from './ProfileUsernameList'

describe('<ProfileUsernameList/>', () => {
	it('should render the list correctly', () => {
		customRender(<ProfileUsernameList />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the user item correctly', () => {
		customRender(<ProfileUsernameList users={mockUsers} />)

		expect(screen.getByText(mockUsers[0].username)).toBeOnTheScreen()
	})
})
