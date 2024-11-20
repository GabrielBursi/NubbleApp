import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { SettingsScreen } from './Settings'

describe('<SettingsScreen/>', () => {
	it('should render', () => {
		customRender(<SettingsScreen />)

		expect(screen.getByRole('text', { name: /Settings/i })).toBeOnTheScreen()
	})
})
