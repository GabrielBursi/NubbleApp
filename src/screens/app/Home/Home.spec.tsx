import { screen } from '@testing-library/react-native'

import { HomeScreen } from './Home'

import { customRender } from '@/tests/utils'

describe('<HomeScreen/>', () => {
	it('should render', () => {
		customRender(<HomeScreen />)

		expect(screen.getByRole('text', { name: /Home/i })).toBeOnTheScreen()
	})
})
