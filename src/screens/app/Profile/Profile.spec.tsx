import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ProfileScreen } from './Profile'

describe('<ProfileScreen/>', () => {
	it('should render', () => {
		customRender(<ProfileScreen />)

		expect(screen.getByRole('text', { name: /Profile/i })).toBeOnTheScreen()
	})
})
