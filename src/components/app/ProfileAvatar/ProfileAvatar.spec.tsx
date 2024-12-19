import { screen } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { ProfileAvatar } from './ProfileAvatar'

describe('<ProfileAvatar/>', () => {
	const mockImageUrl = customFaker.image.url()

	it('should render the image correctly', () => {
		customRender(<ProfileAvatar imageURL={mockImageUrl} />)

		expect(screen.getByRole('img', { name: mockImageUrl })).toBeOnTheScreen()
	})
})
