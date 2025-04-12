import { screen } from '@testing-library/react-native'

import { generateUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { EditProfileHeader } from './EditProfileHeader'

describe('<EditProfileHeader/>', () => {
	const mockUser = generateUser()

	it('should render edit profile header', () => {
		customRender(<EditProfileHeader user={mockUser} />)

		expect(
			screen.getByRole('img', { name: mockUser.profileUrl })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: /alterar foto/i })
		).toBeOnTheScreen()
	})
})
