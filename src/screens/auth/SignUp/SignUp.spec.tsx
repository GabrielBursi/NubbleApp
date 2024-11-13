import { screen, userEvent } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { SignUpScreen } from './SignUp'
import { mockUseNavigation } from '@/tests/mocks'

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
		customRender(<SignUpScreen navigation={mockUseNavigation} />)

		await userEvent.press(
			screen.getByRole('button', { name: /criar uma conta/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SuccessScreen', {
			title: 'Sua conta foi criada com sucesso!',
			description: 'Agora é só fazer login na nossa plataforma',
			icon: {
				name: 'checkRound',
				color: 'success',
			},
		})
	})
})
