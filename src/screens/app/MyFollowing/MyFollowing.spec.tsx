import { screen, waitFor } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MyFollowingScreen } from './MyFollowing'

describe('<MyFollowingScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<MyFollowingScreen />)

		expect(screen.getByRole('text', { name: /Seguindo/i })).toBeOnTheScreen()
		expect(screen.getByRole('list', { name: /Seguindo/i })).toBeOnTheScreen()
	})

	it('should render the following users items', async () => {
		customRender(<MyFollowingScreen />)

		await waitFor(() => {
			expect(
				screen.getAllByRole('button', { name: /seguindo/i }).length
			).toBeGreaterThan(0)
		})
		await waitFor(() => {
			expect(screen.getAllByRole('img').length).toBeGreaterThan(1)
		})
	})
})
