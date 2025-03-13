import { screen, userEvent } from '@testing-library/react-native'

import { useSettingsService } from '@/services/settings'
import { generateOnBoardingItem } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { OnBoardingCarousel } from './OnBoardingCarousel'

type UseSettingsService = typeof useSettingsService
type MockUseSettingsService = HookMocked<UseSettingsService>
type ReturnUseSettingsService = ReturnHookMocked<UseSettingsService>

jest.mock('@/services/settings')

describe('<OnBoardingCarousel/>', () => {
	const mockItems = [
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
		generateOnBoardingItem(),
	]

	const mockFinishOnboarding = jest.fn()

	const mockReturnUseSettingsService: ReturnUseSettingsService = {
		finishOnboarding: mockFinishOnboarding,
	}

	beforeEach(() => {
		;(useSettingsService as MockUseSettingsService).mockReturnValue(
			mockReturnUseSettingsService
		)
	})

	it('should render the list', () => {
		customRender(<OnBoardingCarousel />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
	})

	it('should render the items', () => {
		customRender(<OnBoardingCarousel items={mockItems} />)

		expect(screen.getAllByTestId('onboarding-item')).toHaveLength(
			mockItems.length
		)
	})

	it('should finish when is in the last page', async () => {
		customRender(
			<OnBoardingCarousel
				items={[
					{ ...mockItems[0]!, isLast: false },
					{ ...mockItems[1]!, isLast: true },
				]}
			/>
		)

		await userEvent.press(screen.getByRole('text', { name: /próximo/i }))
		await userEvent.press(screen.getByRole('text', { name: /Começar/i }))
		expect(mockFinishOnboarding).toHaveBeenCalledTimes(1)
	})

	it('should finish when press to skip', async () => {
		customRender(<OnBoardingCarousel items={mockItems} />)

		await userEvent.press(screen.getAllByRole('text', { name: /pular/i })[0]!)
		expect(mockFinishOnboarding).toHaveBeenCalled()
	})
})
