import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { ProfileMetadata } from './ProfileMetadata'

describe('<ProfileMetadata/>', () => {
	const followersCount = customFaker.number.int({ min: 1 })
	const followingCount = customFaker.number.int({ min: 1 })
	const postsCount = customFaker.number.int({ min: 1 })

	it('should render without props', () => {
		customRender(<ProfileMetadata />)

		expect(screen.getAllByRole('text', { name: '0' })).toHaveLength(3)
		expect(screen.getByRole('text', { name: /Publicações/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Seguidores/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Seguindo/i })).toBeOnTheScreen()
	})

	it('should render with props', () => {
		customRender(
			<ProfileMetadata
				followersCount={followersCount}
				followingCount={followingCount}
				postsCount={postsCount}
			/>
		)

		expect(
			screen.getByRole('text', { name: followersCount.toString() })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: followingCount.toString() })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: postsCount.toString() })
		).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Publicações/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Seguidores/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Seguindo/i })).toBeOnTheScreen()
	})

	it('should navigate to followers and following screen when is my profile', async () => {
		customRender(
			<ProfileMetadata
				followersCount={followersCount}
				followingCount={followingCount}
				postsCount={postsCount}
				isMyProfile
			/>
		)

		await userEvent.press(
			screen.getByRole('text', { name: followersCount.toString() })
		)
		await userEvent.press(
			screen.getByRole('text', { name: followingCount.toString() })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('MyFollowersScreen')
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('MyFollowingScreen')
	})

	it('should disable navigation to followers and following screen when is not my profile', async () => {
		customRender(
			<ProfileMetadata
				followersCount={followersCount}
				followingCount={followingCount}
				postsCount={postsCount}
			/>
		)

		await userEvent.press(
			screen.getByRole('text', { name: followersCount.toString() })
		)
		await userEvent.press(
			screen.getByRole('text', { name: followingCount.toString() })
		)

		expect(mockUseNavigation.navigate).not.toHaveBeenCalled()
	})
})
