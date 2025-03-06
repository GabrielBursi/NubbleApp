import { screen } from '@testing-library/react-native'

import { generateOnBoardingItem } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { OnBoardingContent } from './OnBoardingContent'
import { OnBoardingContentProps } from './OnBoardingContent.types'

describe('<OnBoardingContent/>', () => {
	const mockProps: OnBoardingContentProps = {
		subtitle: customFaker.lorem.sentence(),
		title: generateOnBoardingItem().title,
	}

	it('should render correctly', () => {
		customRender(<OnBoardingContent {...mockProps} />)

		expect(
			screen.getByRole('text', { name: mockProps.subtitle })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: mockProps.title[0]?.text })
		).toBeOnTheScreen()
	})
})
