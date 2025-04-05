import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { EditProfileScreen } from './EditProfile'

describe('<EditProfileScreen/>', () => {
	it('should render', () => {
		customRender(<EditProfileScreen />)

		expect(screen.getByRole('text', { name: /EditProfile/i })).toBeOnTheScreen()
	})
})
