import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ThemeScreen } from './Theme'

describe('<ThemeScreen/>', () => {
	it('should render the options of theme', () => {
		customRender(<ThemeScreen />)

		expect(screen.getByRole('radiogroup')).toBeOnTheScreen()
		expect(screen.getAllByRole('radio')).toHaveLength(3)
		expect(
			screen.getByRole('radio', { name: /Padrão do sistema/i })
		).toHaveAccessibilityState({ checked: true })
	})
})
