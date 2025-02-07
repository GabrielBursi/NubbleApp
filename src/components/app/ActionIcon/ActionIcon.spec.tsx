import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ActionIcon } from './ActionIcon'

describe('<ActionIcon/>', () => {
	const mockOnPress = jest.fn()

	it('should render the action icon correctly', () => {
		customRender(
			<ActionIcon icon={{ default: 'heart', marked: 'heartFill' }} />
		)

		expect(screen.getByRole('img', { name: 'heart' })).toBeOnTheScreen()
	})

	it('should render the action icon marked correctly', () => {
		customRender(
			<ActionIcon marked icon={{ default: 'heart', marked: 'heartFill' }} />
		)

		expect(screen.getByRole('img', { name: 'heartFill' })).toBeOnTheScreen()
	})

	it('should render the bigint label correctly', () => {
		customRender(
			<ActionIcon
				icon={{ default: 'heart', marked: 'heartFill' }}
				label={775200}
			/>
		)

		expect(screen.getByText('775.2K', { exact: true })).toBeOnTheScreen()
	})

	it('should render the label text correctly', () => {
		customRender(
			<ActionIcon
				icon={{ default: 'heart', marked: 'heartFill' }}
				label="jest sb"
			/>
		)

		expect(screen.getByText('Jest Sb', { exact: true })).toBeOnTheScreen()
	})

	it('should render the label on left side correctly', () => {
		customRender(
			<ActionIcon
				icon={{ default: 'heart', marked: 'heartFill' }}
				label={775200}
				positionLabel="left"
			/>
		)

		expect(screen.getAllByRole('img')).toHaveLength(1)
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
