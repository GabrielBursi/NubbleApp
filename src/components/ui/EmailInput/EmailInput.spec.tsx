import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { EmailInput } from './EmailInput'

describe('<EmailInput/>', () => {
	it('should render the email input correctly', () => {
		customRender(<EmailInput />)

		expect(screen.getByLabelText('E-mail', { exact: true })).toBeOnTheScreen()
		expect(screen.getByTestId('message', { exact: true })).toBeOnTheScreen()
	})
})
