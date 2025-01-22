import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { PasswordInput } from './PasswordInput'

describe('<PasswordInput/>', () => {
	it('should render the input correctly', () => {
		customRender(<PasswordInput />)

		expect(screen.getByLabelText('Senha', { exact: true })).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should toogle the icon on change visibility correctly', async () => {
		customRender(<PasswordInput />)

		expect(screen.getByTestId('eyeOn', { exact: true })).toBeOnTheScreen()
		await userEvent.press(screen.getByTestId('eyeOn', { exact: true }))
		expect(screen.getByTestId('eyeOff', { exact: true })).toBeOnTheScreen()
	})
})
