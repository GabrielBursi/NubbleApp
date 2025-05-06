import { screen, waitFor } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { MyFollowersScreen } from './MyFollowers'

describe('<MyFollowersScreen/>', () => {
	it('should render', () => {
		customRender(<MyFollowersScreen />)

		expect(screen.getByRole('text', { name: /seguidores/i })).toBeOnTheScreen()
		expect(screen.getByRole('list', { name: /seguidores/i })).toBeOnTheScreen()
	})

	it('should render the followers users items', async () => {
		customRender(<MyFollowersScreen />)

		await waitFor(() => {
			expect(
				screen.getAllByRole('button', { name: /remover/i }).length
			).toBeGreaterThan(0)
		})
		await waitFor(() => {
			expect(screen.getAllByRole('img').length).toBeGreaterThan(1)
		})
	})
})
