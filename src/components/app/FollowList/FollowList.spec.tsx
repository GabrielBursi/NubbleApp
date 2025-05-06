import { screen, waitFor } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { FollowList } from './FollowList'

describe('<FollowList />', () => {
	it('renders followers list and items', async () => {
		customRender(<FollowList type="followers" />)

		const list = screen.getByRole('list', { name: /seguidores/i })
		expect(list).toBeTruthy()

		await waitFor(() => {
			expect(
				screen.getAllByRole('button', { name: /remover/i }).length
			).toBeGreaterThan(0)
		})

		await waitFor(() => {
			expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
		})
	})

	it('renders following list and items', async () => {
		customRender(<FollowList type="following" />)

		const list = screen.getByRole('list', { name: /seguindo/i })
		expect(list).toBeTruthy()

		await waitFor(() => {
			expect(
				screen.getAllByRole('button', { name: /seguindo/i }).length
			).toBeGreaterThan(0)
		})

		await waitFor(() => {
			expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
		})
	})
})
