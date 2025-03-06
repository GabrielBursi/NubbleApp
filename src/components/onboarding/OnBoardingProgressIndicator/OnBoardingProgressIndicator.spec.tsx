import { screen } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { OnBoardingProgressIndicator } from './OnBoardingProgressIndicator'
import { OnBoardingProgressIndicatorProps } from './OnBoardingProgressIndicator.types'

describe('<OnBoardingProgressIndicator/>', () => {
	const mockProps: OnBoardingProgressIndicatorProps = {
		total: customFaker.number.int({ min: 5, max: 10 }),
		currentIndex: customFaker.number.int({ min: 5, max: 9 }),
	}

	it('should render the total of indicator correctly', () => {
		customRender(<OnBoardingProgressIndicator {...mockProps} />)

		expect(screen.getByRole('list')).toBeOnTheScreen()
		expect(screen.getAllByRole('listitem')).toHaveLength(mockProps.total)
	})

	it('should render the current indicator', () => {
		customRender(
			<OnBoardingProgressIndicator {...mockProps} currentIndex={0} />
		)

		expect(
			screen.getByRole('listitem', { name: String(0) })
		).toHaveAccessibilityState({ selected: true })
	})
})
