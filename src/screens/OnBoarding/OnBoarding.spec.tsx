import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { OnBoardingScreen } from './OnBoarding'

describe('<OnBoardingScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<OnBoardingScreen />)

		expect(screen.getByTestId('onboarding-item')).toBeOnTheScreen()
	})
})
