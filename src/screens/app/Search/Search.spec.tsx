import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { SearchScreen } from './Search'

describe('<SearchScreen/>', () => {
	it('should render', () => {
		customRender(<SearchScreen />)

		expect(screen.getByRole('text', { name: /Search/i })).toBeOnTheScreen()
	})
})
