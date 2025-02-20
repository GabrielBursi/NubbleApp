import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MenuItem } from './MenuItem'

describe('<MenuItem/>', () => {
	const mockOnPress = jest.fn()

	it('should render the menu item', () => {
		customRender(<MenuItem label="jest" />)

		expect(screen.getByRole('text', { name: /jest/i })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: /chevronRight/i })).toBeOnTheScreen()
	})

	it('should press the menu item', async () => {
		customRender(<MenuItem label="jest" onPress={mockOnPress} />)

		await userEvent.press(screen.getByRole('text', { name: /jest/i }))
		expect(mockOnPress).toHaveBeenCalled()
	})
})
