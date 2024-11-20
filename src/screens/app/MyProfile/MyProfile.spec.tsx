import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MyProfileScreen } from './MyProfile'

describe('<MyProfileScreen/>', () => {
	it('should render', () => {
		customRender(<MyProfileScreen />)

		expect(screen.getByRole('text', { name: /MyProfile/i })).toBeOnTheScreen()
	})
})
