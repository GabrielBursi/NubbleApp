import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { OnBoardingBottomMenu } from './OnBoardingBottomMenu'

describe('<OnBoardingBottomMenu/>', () => {
	const mockOnPressNext = jest.fn()
	const mockOnPressSkip = jest.fn()

	it('should render correctly', () => {
		customRender(
			<OnBoardingBottomMenu
				onPressNext={mockOnPressNext}
				onPressSkip={mockOnPressSkip}
			/>
		)

		expect(screen.getByRole('text', { name: /pular/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /próximo/i })).toBeOnTheScreen()
	})

	it('should press the buttons correctly', async () => {
		customRender(
			<OnBoardingBottomMenu
				onPressNext={mockOnPressNext}
				onPressSkip={mockOnPressSkip}
			/>
		)

		await userEvent.press(screen.getByRole('text', { name: /pular/i }))
		await userEvent.press(screen.getByRole('text', { name: /próximo/i }))

		expect(mockOnPressNext).toHaveBeenCalled()
		expect(mockOnPressSkip).toHaveBeenCalled()
	})
})
