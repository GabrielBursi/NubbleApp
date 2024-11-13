import { screen } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { SuccessScreen } from './Success'

describe('<SuccessScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<SuccessScreen />)

		expect(screen.getByRole('img')).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Título/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /Descrição/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /Voltar ao início/i })
		).toBeOnTheScreen()
	})
})
