import { Text } from 'react-native'

import { screen, userEvent } from '@testing-library/react-native'

import { lightTheme } from '@/styles'
import { customRender } from '@/tests/utils'

import { TouchableOpacityBox } from './TouchableOpacityBox'

describe('<TouchableOpacityBox/>', () => {
	const mockOnPress = jest.fn()

	it('should render the touchable box correctly', () => {
		customRender(
			<TouchableOpacityBox
				testID="box"
				backgroundColor="background"
				onPress={mockOnPress}
			>
				<Text>jest</Text>
			</TouchableOpacityBox>
		)

		expect(screen.getByTestId('box', { exact: true })).toHaveStyle({
			backgroundColor: lightTheme.colors.background,
		})
	})

	it('should press the touchable box correctly', async () => {
		customRender(
			<TouchableOpacityBox
				testID="box"
				backgroundColor="background"
				onPress={mockOnPress}
			>
				<Text>jest</Text>
			</TouchableOpacityBox>
		)

		await userEvent.press(screen.getByText('jest', { exact: true }))

		expect(mockOnPress).toHaveBeenCalled()
	})
})
