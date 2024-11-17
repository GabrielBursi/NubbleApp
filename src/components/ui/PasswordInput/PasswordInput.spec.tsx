import { screen, userEvent } from '@testing-library/react-native'

import { PasswordInput } from './PasswordInput'

import { customRender } from '@/tests/utils'

describe('<PasswordInput/>', () => {
	it('should render the input correctly', () => {
		customRender(<PasswordInput label="jest" />)

		expect(screen.getByLabelText('jest', { exact: true })).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should toogle the icon on change visibility correctly', async () => {
		customRender(<PasswordInput label="jest" />)

		expect(screen.getByTestId('eyeOn', { exact: true })).toBeOnTheScreen()
		await userEvent.press(screen.getByTestId('eyeOn', { exact: true }))
		expect(screen.getByTestId('eyeOff', { exact: true })).toBeOnTheScreen()
	})
})
