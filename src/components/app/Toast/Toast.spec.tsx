import { screen } from '@testing-library/react-native'

import { useToast, useToastService } from '@/services/toast/useToast'
import { generateToast } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { Toast } from './Toast'

type UseToast = typeof useToast
type ReturnUseToast = ReturnHookMocked<UseToast>
type MockUseToast = HookMocked<UseToast>

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

jest.mock('@/services/toast/useToast')

describe('<Toast/>', () => {
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()

	const mockInicialUseToast: ReturnUseToast = null
	const mockInicialUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	beforeEach(() => {
		;(useToast as MockUseToast).mockReturnValue(mockInicialUseToast)
		;(useToastService as MockUseToastService).mockReturnValue(
			mockInicialUseToastService
		)
	})

	it('should a empty component without toast correctly', () => {
		customRender(<Toast />)

		expect(screen.queryByRole('text')).not.toBeOnTheScreen()
		expect(screen.queryByRole('img')).not.toBeOnTheScreen()
	})

	it('should render the toast correctly', () => {
		const mockToast = generateToast()
		;(useToast as MockUseToast).mockReturnValue(mockToast)

		customRender(<Toast />)

		expect(
			screen.getByRole('text', { name: mockToast.message })
		).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})

	it('should hide the toast correctly', () => {
		const mockToast = generateToast()
		;(useToast as MockUseToast).mockReturnValue({
			...mockToast,
			duration: undefined,
		})

		customRender(<Toast />)

		jest.runAllTimers()

		expect(mockHideToast).toHaveBeenCalled()
	})
})
