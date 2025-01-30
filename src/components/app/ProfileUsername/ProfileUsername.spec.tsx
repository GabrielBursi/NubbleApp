import { screen } from '@testing-library/react-native'

import { mockUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileUsername } from './ProfileUsername'

describe('<ProfileUsername/>', () => {
	it('should render', () => {
		customRender(<ProfileUsername {...mockUser} />)

		expect(
			screen.getByRole('img', { name: mockUser.username })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockUser.username })
		).toBeOnTheScreen()
	})
})
