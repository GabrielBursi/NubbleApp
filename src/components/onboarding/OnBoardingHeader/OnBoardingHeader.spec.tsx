import { screen } from '@testing-library/react-native'

import { useAppThemeOption } from '@/services/settings'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { OnBoardingHeader } from './OnBoardingHeader'
import { OnBoardingHeaderProps } from './OnBoardingHeader.types'

type UseAppThemeOption = typeof useAppThemeOption
type MockUseAppThemeOption = HookMocked<UseAppThemeOption>
type ReturnUseAppThemeOption = ReturnHookMocked<UseAppThemeOption>

jest.mock('@/services/settings')

describe('<OnBoardingHeader/>', () => {
	const darkUrl = customFaker.image.url()
	const lightUrl = customFaker.image.url()

	const mockProps: OnBoardingHeaderProps = {
		image: {
			dark: {
				uri: darkUrl,
			},
			light: {
				uri: lightUrl,
			},
		},
	}

	const mockReturn: ReturnUseAppThemeOption = 'dark'

	beforeEach(() => {
		;(useAppThemeOption as MockUseAppThemeOption).mockReturnValue(mockReturn)
	})

	it('should render with dark theme', () => {
		customRender(<OnBoardingHeader {...mockProps} />)

		expect(screen.getByRole('img')).toHaveProp('source', {
			uri: darkUrl,
		})
	})

	it('should render with light theme', () => {
		;(useAppThemeOption as MockUseAppThemeOption).mockReturnValue('light')

		customRender(<OnBoardingHeader {...mockProps} />)

		expect(screen.getByRole('img')).toHaveProp('source', {
			uri: lightUrl,
		})
	})
})
