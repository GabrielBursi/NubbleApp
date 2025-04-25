import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MyFollowersScreen } from './MyFollowers'

describe('<MyFollowersScreen/>', () => {
	it('should render', () => {
		customRender(<MyFollowersScreen />)

		expect(screen.getByRole('text', { name: /MyFollowers/i })).toBeOnTheScreen()
	})
})
