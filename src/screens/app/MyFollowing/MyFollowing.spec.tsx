import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MyFollowingScreen } from './MyFollowing'

describe('<MyFollowingScreen/>', () => {
	it('should render', () => {
		customRender(<MyFollowingScreen />)

		expect(screen.getByRole('text', { name: /MyFollowing/i })).toBeOnTheScreen()
	})
})
