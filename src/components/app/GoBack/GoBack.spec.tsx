import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'
import { mockUseNavigation } from '@/tests/mocks'

import { GoBack } from './GoBack'

describe('<GoBack/>', () => {
	it('should render the button correctly', () => {
		customRender(<GoBack />)

		expect(screen.getByText('Voltar', { exact: true })).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should go back navigation when press button correctly', async () => {
		customRender(<GoBack />)

		await userEvent.press(screen.getByText('Voltar', { exact: true }))
		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})
})
