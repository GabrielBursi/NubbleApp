import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ThemeScreen } from './Theme'

describe('<ThemeScreen/>', () => {
	it('should render', () => {
		customRender(<ThemeScreen />)

		expect(screen.getByRole('text', { name: /Theme/i })).toBeOnTheScreen()
	})
})
