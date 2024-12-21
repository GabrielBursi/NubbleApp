import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { TextInputMessage } from './TextInputMessage'

describe('<TextInputMessage/>', () => {
	const mockOnPressSend = jest.fn()

	it('should the input message correctly', () => {
		customRender(<TextInputMessage onPressSend={mockOnPressSend} />)

		expect(screen.getByRole('button', { name: /enviar/i })).toBeOnTheScreen()
		expect(
			screen.getByPlaceholderText('Digite aqui', { exact: true })
		).toBeOnTheScreen()
	})

	it('should disable button send when there is no value correctly', () => {
		customRender(<TextInputMessage onPressSend={mockOnPressSend} value="" />)

		expect(screen.getByRole('button', { name: /enviar/i })).toBeDisabled()
	})

	it('should call on press send correctly', async () => {
		customRender(
			<TextInputMessage onPressSend={mockOnPressSend} value="jest" />
		)

		await userEvent.press(
			screen.getByTestId('container-input-message', { exact: true })
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite aqui', { exact: true }),
			'jest'
		)
		await userEvent.press(screen.getByRole('button', { name: /enviar/i }))
		expect(mockOnPressSend).toHaveBeenCalled()
	})
})
