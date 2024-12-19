import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ScreenHeader } from './ScreenHeader'

describe('<ScreenHeader/>', () => {
	it('should render go back button correctly', () => {
		customRender(<ScreenHeader canGoBack />)

		expect(screen.getByRole('text', { name: /voltar/i })).toBeOnTheScreen()
	})

	it('should go back correctly', async () => {
		customRender(<ScreenHeader canGoBack />)

		await userEvent.press(screen.getByRole('text', { name: /voltar/i }))
		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})

	it('should render the title correctly', () => {
		customRender(<ScreenHeader title="jest" />)

		expect(screen.getByRole('text', { name: /jest/i })).toBeOnTheScreen()
	})
})
