import { screen } from '@testing-library/react-native'

import { generateOnBoardingItem } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { OnBoardingCarousel } from './OnBoardingCarousel'

describe('<OnBoardingCarousel/>', () => {
	const mockItems = [
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
	]

	it('should render the list', () => {
		customRender(<OnBoardingCarousel />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the items', () => {
		customRender(<OnBoardingCarousel items={mockItems} />)

		expect(screen.getAllByRole('listitem')).toHaveLength(mockItems.length)
	})
})
