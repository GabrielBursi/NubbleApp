import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { FavoriteScreen } from './Favorite'

describe('<FavoriteScreen/>', () => {
	it('should render', () => {
		customRender(<FavoriteScreen />)

		expect(screen.getByRole('text', { name: /Favorite/i })).toBeOnTheScreen()
	})
})
