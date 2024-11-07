import { screen } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { LoginScreen } from './Login'

describe('<LoginScreen/>', () => {
	it('should render', () => {
		customRender(<LoginScreen />)

		expect(screen.getByRole('text', { name: /Login/i })).toBeOnTheScreen()
	})
})
