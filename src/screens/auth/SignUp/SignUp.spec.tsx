import { screen, userEvent } from '@testing-library/react-native'

import { SignUpScreen } from './SignUp'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

describe('<SignUpScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<SignUpScreen />)

		expect(
			screen.getAllByRole('text', { name: 'Criar uma conta' })
		).toHaveLength(2)

		expect(
			screen.getByLabelText('Seu username', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Nome Completo', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('E-mail', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Senha', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeOnTheScreen()
	})

	it('should navigate to success screen correctly', async () => {
		customRender(<SignUpScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('@', {
				exact: true,
			}),
			'user.name_123'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome completo', {
				exact: true,
			}),
			'jest test'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite sua senha', {
				exact: true,
			}),
			'12345678'
		)

		await userEvent.press(
			screen.getByRole('button', { name: /criar uma conta/i })
		)

		expect(mockUseNavigation.reset).toHaveBeenCalled()
	})

	it('should validate the form correctly', async () => {
		customRender(<SignUpScreen />)

		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeDisabled()

		await userEvent.type(
			screen.getByPlaceholderText('@', {
				exact: true,
			}),
			'user.name_123'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome completo', {
				exact: true,
			}),
			'jest test'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite sua senha', {
				exact: true,
			}),
			'12345678'
		)

		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeEnabled()
	})
})
