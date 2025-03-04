import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { OnBoardingHeader } from './OnBoardingHeader'

describe('<OnBoardingHeader/>', () => {
	it('should render', () => {
		customRender(<OnBoardingHeader />)

		expect(screen.getByRole('img')).toBeOnTheScreen()
	})
})
