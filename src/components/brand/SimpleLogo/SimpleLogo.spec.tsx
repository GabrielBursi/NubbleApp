import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { SimpleLogo } from './SimpleLogo'

describe('<SimpleLogo/>', () => {
	it('should render the logo correctly', () => {
		customRender(<SimpleLogo />)

		expect(screen.getByRole('img', { name: /simple-logo/i })).toBeOnTheScreen()
	})
})
