import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { FeedHeader } from './FeedHeader'

describe('<FeedHeader/>', () => {
	it('should render the header with icons correctly', () => {
		customRender(<FeedHeader />)

		expect(screen.getAllByRole('img')).toHaveLength(3)
	})
})
