import { screen, userEvent } from '@testing-library/react-native'

import { SuccessScreen } from './Success'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

describe('<SuccessScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(
			<SuccessScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'SuccessScreen',
					name: 'SuccessScreen',
					params: {
						description: 'Descrição',
						title: 'Título',
						icon: {
							name: 'checkRound',
							color: 'success',
						},
					},
				}}
			/>
		)

		expect(screen.getByRole('img')).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Título/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Descrição/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /Voltar ao início/i })
		).toBeOnTheScreen()
	})

	it('should navigate to login the screen correctly', async () => {
		customRender(
			<SuccessScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'SuccessScreen',
					name: 'SuccessScreen',
					params: {
						description: 'Descrição',
						title: 'Título',
						icon: {
							name: 'checkRound',
							color: 'success',
						},
					},
				}}
			/>
		)

		await userEvent.press(
			screen.getByRole('button', { name: /Voltar ao início/i })
		)

		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})
})
