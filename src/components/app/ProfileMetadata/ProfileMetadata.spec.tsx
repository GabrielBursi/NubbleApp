import { screen } from '@testing-library/react-native'

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
})
