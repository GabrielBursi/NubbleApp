import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { Button } from './Button'

describe('Button Compound', () => {
	describe('<Button />', () => {
		const mockOnPress = jest.fn()

		it('should render the button correctly', () => {
			customRender(<Button title="Jest" />)

			expect(screen.getByRole('button', { name: /jest/i })).toBeOnTheScreen()
		})

		it('should render the button loading correctly', async () => {
			customRender(<Button title="Jest" loading />)

			expect(screen.getByRole('button', { name: /jest/i })).toBeDisabled()
			expect(screen.queryByText('Jest', { exact: true })).not.toBeOnTheScreen()
			await userEvent.press(screen.getByRole('button', { name: /jest/i }))
			expect(mockOnPress).not.toHaveBeenCalled()
		})

		it('should render the button disabled correctly', async () => {
			customRender(<Button title="Jest" disabled />)

			expect(screen.getByRole('button', { name: /jest/i })).toBeDisabled()
			expect(screen.getByText('Jest', { exact: true })).toBeOnTheScreen()
			await userEvent.press(screen.getByRole('button', { name: /jest/i }))
			expect(mockOnPress).not.toHaveBeenCalled()
		})
	})

	describe('<Button.Input />', () => {
		it('should render the input button correctly', () => {
			customRender(<Button.Input label="jest" value="react" />)

			expect(screen.getByRole('button', { name: /jest/i })).toBeOnTheScreen()
			expect(screen.getByText('jest')).toBeOnTheScreen()
			expect(screen.getByText('react')).toBeOnTheScreen()
			expect(
				screen.getByRole('img', { name: /chevronRight/i })
			).toBeOnTheScreen()
		})
	})
})
