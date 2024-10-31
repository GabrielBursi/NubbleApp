import { screen } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import HomeScreen from './Home'

describe('<HomeScreen/>', () => {
	it('should render', () => {
		customRender(<HomeScreen />)

		expect(screen.getByRole('text', { name: /Home/i })).toBeOnTheScreen()
	})
})
