import { screen, userEvent } from '@testing-library/react-native'

import { Icon } from './Icon'

import { customRender } from '@/tests/utils'

describe('<Icon/>', () => {
	const mockOnPress = jest.fn()

	it('should render the icon correctly', () => {
		customRender(<Icon name="arrowLeft" />)

		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should render the pressable icon correctly', async () => {
		customRender(<Icon name="arrowLeft" onPress={mockOnPress} />)

		await userEvent.press(screen.getByRole('img'))
		expect(mockOnPress).toHaveBeenCalled()
	})
})
