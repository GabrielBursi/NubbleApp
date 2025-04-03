import { screen } from '@testing-library/react-native'

import { generateUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileHeader } from './ProfileHeader'

describe('<ProfileHeader/>', () => {
	const mockUser = generateUser()

	it('should render profile header correctly', () => {
		customRender(<ProfileHeader user={mockUser} />)

		expect(
			screen.getByRole('img', { name: mockUser.profileUrl })
		).toBeOnTheScreen()
		expect(screen.getByText(mockUser.fullName)).toBeOnTheScreen()
		expect(screen.getByText(`@${mockUser.username}`)).toBeOnTheScreen()
		expect(screen.getByText('1')).toBeOnTheScreen()
		expect(screen.getByText('2')).toBeOnTheScreen()
		expect(screen.getByText('3')).toBeOnTheScreen()
	})
})
