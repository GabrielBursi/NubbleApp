import { screen } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { SignUpScreen } from './SignUp'

describe('<SignUpScreen/>', () => {
	it('should render', () => {
		customRender(<SignUpScreen />)

		expect(screen.getByRole('text', { name: /SignUp/i })).toBeOnTheScreen()
	})
})
