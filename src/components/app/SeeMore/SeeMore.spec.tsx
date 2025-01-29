import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { SeeMore } from './SeeMore'

describe('<SeeMore/>', () => {
	const mockOnSeeMore = jest.fn()

	it('should render the see more text correctly', () => {
		customRender(<SeeMore />)

		expect(screen.getByRole('text', { name: /ver mais/i })).toBeOnTheScreen()
	})

	it('should render the see less text correctly', () => {
		customRender(<SeeMore expanded />)

		expect(screen.getByRole('text', { name: /ver menos/i })).toBeOnTheScreen()
	})

	it('should call onSeeMore correctly', async () => {
		customRender(<SeeMore handleExpanded={mockOnSeeMore} />)

		await userEvent.press(screen.getByRole('text', { name: /ver mais/i }))

		expect(mockOnSeeMore).toHaveBeenCalled()
	})
})
