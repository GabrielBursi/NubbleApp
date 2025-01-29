import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { FeedHeader } from './FeedHeader'

describe('<FeedHeader/>', () => {
	it('should render the header with icons correctly', () => {
		customRender(<FeedHeader />)

		expect(screen.getAllByRole('img')).toHaveLength(4)
	})

	it('should navigate to search screen correctly', async () => {
		customRender(<FeedHeader />)

		await userEvent.press(screen.getByRole('img', { name: 'search' }))
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SearchScreen')
	})
})
