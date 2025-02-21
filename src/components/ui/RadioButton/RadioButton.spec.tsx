import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { RadioButton } from './RadioButton'

describe('<RadioButton/>', () => {
	const mockOnChange = jest.fn()

	it('should render the radio button', () => {
		customRender(<RadioButton />)

		expect(screen.getByRole('radio')).toHaveAccessibilityState({
			disabled: false,
			checked: false,
		})
	})

	it('should render the controlled radio button', () => {
		customRender(<RadioButton checked />)

		expect(screen.getByRole('radio')).toHaveAccessibilityState({
			disabled: false,
			checked: true,
		})
	})

	it('should press radio button', async () => {
		customRender(<RadioButton checked onChange={mockOnChange} />)

		await userEvent.press(screen.getByRole('radio'))

		expect(mockOnChange).toHaveBeenCalledWith(false)
	})

	it('should render the radio button disabled', async () => {
		customRender(<RadioButton checked onChange={mockOnChange} disabled />)

		expect(screen.getByRole('radio')).toHaveAccessibilityState({
			disabled: true,
			checked: true,
		})

		await userEvent.press(screen.getByRole('radio'))

		expect(mockOnChange).not.toHaveBeenCalled()
	})
})
