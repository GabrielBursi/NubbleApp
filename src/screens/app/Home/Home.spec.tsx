import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { HomeScreen } from './Home'

describe('<HomeScreen/>', () => {
	it('should render the posts feed correctly', () => {
		customRender(<HomeScreen />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})
})
