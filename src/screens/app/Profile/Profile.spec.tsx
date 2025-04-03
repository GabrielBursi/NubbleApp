import { screen, waitFor } from '@testing-library/react-native'

import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ProfileScreen } from './Profile'

describe('<ProfileScreen/>', () => {
	const mockUser = generateUser()

	it('should render profile screen correctly', async () => {
		customRender(
			<ProfileScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'ProfileScreen',
					name: 'ProfileScreen',
					params: { userId: mockUser.id },
				}}
			/>
		)

		await waitFor(() => {
			expect(
				screen.getByRole('list', { name: /user posts/i })
			).toBeOnTheScreen()
		})
	})
})
