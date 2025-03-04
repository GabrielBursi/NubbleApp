import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { OnBoardingBottomMenu } from './OnBoardingBottomMenu'

describe('<OnBoardingBottomMenu/>', () => {
	it('should render correctly', () => {
		customRender(<OnBoardingBottomMenu />)

		expect(screen.getByRole('text', { name: /pular/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /próximo/i })).toBeOnTheScreen()
	})
})
