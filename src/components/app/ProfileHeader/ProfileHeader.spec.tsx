import { screen, userEvent } from '@testing-library/react-native'

import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileHeader } from './ProfileHeader'

describe('<ProfileHeader/>', () => {
	const mockUser = generateUser()

	it('should render profile header correctly', () => {
		customRender(<ProfileHeader user={mockUser} />)

		expect(
			screen.getByRole('img', { name: mockUser.profileUrl })
		).toBeOnTheScreen()
		expect(screen.getByRole('button')).toBeOnTheScreen()
		expect(screen.getByText(mockUser.fullName)).toBeOnTheScreen()
		expect(screen.getByText(`@${mockUser.username}`)).toBeOnTheScreen()
		expect(
			screen.getByText(mockUser.meta.followersCount.toString())
		).toBeOnTheScreen()
		expect(
			screen.getByText(mockUser.meta.followingCount.toString())
		).toBeOnTheScreen()
		expect(screen.getByText('0')).toBeOnTheScreen()
	})

	it('should navigate to settings screen correctly', async () => {
		customRender(<ProfileHeader user={mockUser} isMyProfile />)

		await userEvent.press(screen.getByRole('img', { name: 'settings' }))
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SettingsScreen')
	})
})
