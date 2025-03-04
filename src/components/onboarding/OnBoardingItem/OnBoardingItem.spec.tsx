import { screen } from '@testing-library/react-native'

import { useAppThemeOption } from '@/services/settings'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { OnBoardingItem } from './OnBoardingItem'
import { OnBoardingItemProps } from './OnBoardingItem.types'

type UseAppThemeOption = typeof useAppThemeOption
type MockUseAppThemeOption = HookMocked<UseAppThemeOption>
type ReturnUseAppThemeOption = ReturnHookMocked<UseAppThemeOption>

jest.mock('@/services/settings')

describe('<OnBoardingItem/>', () => {
	const darkUrl = customFaker.image.url()
	const lightUrl = customFaker.image.url()

	const mockProps: OnBoardingItemProps = {
		item: {
			subtitle: customFaker.lorem.sentence(),
			title: customFaker.lorem.word(),
			image: {
				dark: { uri: darkUrl },
				light: { uri: lightUrl },
			},
		},
		onPressNext: jest.fn(),
		onPressSkip: jest.fn(),
	}

	const mockReturn: ReturnUseAppThemeOption = 'dark'

	beforeEach(() => {
		;(useAppThemeOption as MockUseAppThemeOption).mockReturnValue(mockReturn)
	})

	it('should render correctly', () => {
		customRender(<OnBoardingItem {...mockProps} />)

		expect(
			screen.getByRole('text', { name: mockProps.item.title })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.item.subtitle })
		).toBeOnTheScreen()
		expect(screen.getAllByRole('img')).toHaveLength(2)
		expect(screen.getByRole('text', { name: /pular/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /próximo/i })).toBeOnTheScreen()
	})
})
