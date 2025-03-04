import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { OnBoardingScreen } from './OnBoarding'

describe('<OnBoardingScreen/>', () => {
	it('should render', () => {
		customRender(<OnBoardingScreen />)

		expect(screen.getByRole('text', { name: /box 1/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /box 2/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /box 3/i })).toBeOnTheScreen()
	})
})
