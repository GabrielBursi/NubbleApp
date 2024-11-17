import { screen, userEvent } from '@testing-library/react-native'

import { GoBack } from './GoBack'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

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
