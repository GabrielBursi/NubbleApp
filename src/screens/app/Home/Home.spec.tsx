import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { HomeScreen } from './Home'

describe('<HomeScreen/>', () => {
	it('should render', async () => {
		customRender(
			<HomeScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ name: 'HomeScreen', key: 'HomeScreen' }}
			/>
		)

		await Promise.all([
			userEvent.press(screen.getByRole('button', { name: 'FavoriteScreen' })),
			userEvent.press(screen.getByRole('button', { name: 'MyProfileScreen' })),
			userEvent.press(screen.getByRole('button', { name: 'NewPostScreen' })),
			userEvent.press(screen.getByRole('button', { name: 'SettingsScreen' })),
		])

		await userEvent.press(
			screen.getByRole('button', { name: 'FavoriteScreen' })
		)
		await userEvent.press(
			screen.getByRole('button', { name: 'MyProfileScreen' })
		)
		await userEvent.press(screen.getByRole('button', { name: 'NewPostScreen' }))
		await userEvent.press(
			screen.getByRole('button', { name: 'SettingsScreen' })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('FavoriteScreen')
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('MyProfileScreen')
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('NewPostScreen')
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SettingsScreen')
	})
})
