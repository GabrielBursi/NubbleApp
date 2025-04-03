import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation, mockUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileUsername } from './ProfileUsername'

describe('<ProfileUsername/>', () => {
	const mockOnPress = jest.fn()

	it('should render the component correctly', () => {
		customRender(<ProfileUsername {...mockUser} />)

		expect(
			screen.getByRole('img', { name: mockUser.profileUrl })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockUser.username })
		).toBeOnTheScreen()
	})

	it('should navigate to profile screen correctly', async () => {
		customRender(<ProfileUsername {...mockUser} onPress={mockOnPress} />)

		await userEvent.press(
			screen.getByRole('button', { name: mockUser.username })
		)
		expect(mockOnPress).toHaveBeenCalled()
		expect(mockUseNavigation.push).toHaveBeenCalledWith('ProfileScreen', {
			userId: mockUser.id,
		})
	})
})
