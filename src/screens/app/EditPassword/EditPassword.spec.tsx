import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { EditPasswordScreen } from './EditPassword'

describe('<EditPasswordScreen/>', () => {
	it('should render', () => {
		customRender(<EditPasswordScreen />)

		expect(
			screen.getByRole('text', { name: /EditPassword/i })
		).toBeOnTheScreen()
	})
})
