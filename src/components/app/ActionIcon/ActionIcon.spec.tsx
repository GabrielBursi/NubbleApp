import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ActionIcon } from './ActionIcon'

describe('<ActionIcon/>', () => {
	const mockOnPress = jest.fn()

	it('should render the action icon correctly', () => {
		customRender(
			<ActionIcon marked icon={{ default: 'heart', marked: 'heartFill' }} />
		)

		expect(screen.getByRole('img')).toBeOnTheScreen()
		expect(screen.getByText('0', { exact: true })).toBeOnTheScreen()
	})

	it('should render the action icon with bigint count correctly', () => {
		customRender(
			<ActionIcon
				marked
				icon={{ default: 'heart', marked: 'heartFill' }}
				count={775200}
			/>
		)

		expect(screen.getByText('775.2K', { exact: true })).toBeOnTheScreen()
	})

	it('should press the action icon correctly', async () => {
		customRender(
			<ActionIcon
				icon={{ default: 'heart', marked: 'heartFill' }}
				onPress={mockOnPress}
			/>
		)

		await userEvent.press(screen.getByRole('img'))

		expect(mockOnPress).toHaveBeenCalled()
	})
})
