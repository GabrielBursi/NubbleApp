import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { EditEmailScreen } from './EditEmail'

describe('<EditEmailScreen/>', () => {
	it('should render', () => {
		customRender(<EditEmailScreen />)

		expect(screen.getByRole('text', { name: /EditEmail/i })).toBeOnTheScreen()
	})
})
