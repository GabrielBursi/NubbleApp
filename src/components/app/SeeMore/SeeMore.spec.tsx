import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { SeeMore } from './SeeMore'

describe('<SeeMore/>', () => {
	const mockOnSeeMore = jest.fn()

	it('should render the text correctly', () => {
		customRender(<SeeMore onClickSeeMore={mockOnSeeMore} />)

		expect(screen.getByRole('text', { name: /ver mais/i })).toBeOnTheScreen()
	})

	it('should call onSeeMore correctly', async () => {
		customRender(<SeeMore onClickSeeMore={mockOnSeeMore} />)

		await userEvent.press(screen.getByRole('text', { name: /ver mais/i }))

		expect(mockOnSeeMore).toHaveBeenCalled()
	})
})
