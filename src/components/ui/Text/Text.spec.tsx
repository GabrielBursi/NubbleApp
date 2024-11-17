import { screen } from '@testing-library/react-native'

import { Text } from './Text'

import { customRender } from '@/tests/utils'

describe('<Text/>', () => {
	it('should render the text correctly', () => {
		customRender(<Text>Sample Text</Text>)
		expect(screen.getByText('Sample Text')).toBeTruthy()
	})

	it('should apply the correct font family based on preset and styles', () => {
		customRender(
			<Text preset="headingLarge" bold italic>
				Styled Text
			</Text>
		)
		expect(screen.getByText('Styled Text')).toHaveStyle({
			fontFamily: 'Satoshi-BoldItalic',
			fontSize: 32,
		})
	})

	it('should apply custom styles passed via style prop', () => {
		customRender(
			// eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
			<Text style={{ color: 'blue', fontSize: 20 }}>Custom Style Text</Text>
		)
		expect(screen.getByText('Custom Style Text')).toHaveStyle({
			color: 'blue',
			fontSize: 20,
		})
	})

	it('should pass additional props to the SRText component', () => {
		customRender(<Text accessibilityHint="test hint">Prop Test</Text>)
		expect(screen.getByText('Prop Test').props.accessibilityHint).toBe(
			'test hint'
		)
	})

	it('should render with default font family if no styles are applied', () => {
		customRender(<Text>Default Font</Text>)
		expect(screen.getByText('Default Font')).toHaveStyle({
			fontFamily: 'Satoshi-Regular',
		})
	})

	it('should handle semiBold styling correctly', () => {
		customRender(<Text semiBold>SemiBold Text</Text>)
		expect(screen.getByText('SemiBold Text')).toHaveStyle({
			fontFamily: 'Satoshi-Medium',
		})
	})
})
