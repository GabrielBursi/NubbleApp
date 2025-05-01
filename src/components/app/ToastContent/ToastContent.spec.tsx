import { screen, userEvent } from '@testing-library/react-native'

import { Toast } from '@/services/toast'
import { generateToast } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ToastContent } from './ToastContent'

describe('<ToastContent/>', () => {
	const mockToast: Toast = {
		...generateToast(),
		position: 'bottom',
		type: 'error',
		action: {
			title: 'jest',
			onPress: jest.fn(),
		},
	}

	it('should render the default toast content correctly', () => {
		customRender(<ToastContent message="jest" />)

		expect(screen.getByRole('text', { name: 'jest' })).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should render the error toast content correctly', () => {
		customRender(<ToastContent {...mockToast} />)

		expect(
			screen.getByRole('text', { name: mockToast.message })
		).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should render the action correctly', async () => {
		customRender(<ToastContent {...mockToast} />)

		expect(
			screen.getByRole('text', { name: mockToast.action?.title })
		).toBeOnTheScreen()
		await userEvent.press(
			screen.getByRole('text', { name: mockToast.action?.title })
		)
		expect(mockToast.action?.onPress).toHaveBeenCalled()
	})
})
