import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { Icon } from '../Icon/Icon'

import { RightIconTextInput } from './RightIconTextInput'

describe('<RightIconTextInput/>', () => {
	const mockOnClear = jest.fn()

	it('should render loading indicator correctly', () => {
		customRender(<RightIconTextInput loading />)

		expect(
			screen.getByTestId('spin-indicator', { exact: true })
		).toBeOnTheScreen()
	})

	it('should render clear icon correctly', () => {
		customRender(<RightIconTextInput allowClear isFocused />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'close' })).toBeOnTheScreen()
	})

	it('should call onClear correctly', async () => {
		customRender(
			<RightIconTextInput allowClear isFocused onClear={mockOnClear} />
		)

		await userEvent.press(screen.getByRole('img', { name: 'close' }))
		expect(mockOnClear).toHaveBeenCalled()
	})

	it('should render right icon correctly', () => {
		customRender(<RightIconTextInput rightIcon={<Icon name="arrowLeft" />} />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.queryByRole('img', { name: 'close' })).not.toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'arrowLeft' })).toBeOnTheScreen()
	})

	it('should render an empty node correctly', () => {
		customRender(<RightIconTextInput />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.queryAllByRole('img')).toHaveLength(0)
	})
})
