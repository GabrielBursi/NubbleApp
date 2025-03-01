import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { MyProfileScreen } from './MyProfile'

describe('<MyProfileScreen/>', () => {
	it('should navigate to settings screen correctly', async () => {
		customRender(
			<MyProfileScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ name: 'MyProfileScreen', key: 'MyProfileScreen' }}
			/>
		)

		await userEvent.press(
			screen.getByRole('button', { name: /configurações/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SettingsScreen')
	})
})
