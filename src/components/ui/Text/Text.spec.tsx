/* eslint-disable react-native/no-raw-text */
import { fireEvent, screen, userEvent } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { Text } from './Text'

describe('Text Compound', () => {
	describe('<Text />', () => {
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

	describe('<Text.Expanded />', () => {
		const mockText = customFaker.lorem.paragraph({ min: 40, max: 60 })

		const eventOnTextLayout = {
			nativeEvent: {
				lines: mockText.split('.'),
			},
		}

		it('should render the text with no action correctly', () => {
			customRender(
				<Text.Expanded numberOfLines={10}>Sample Text</Text.Expanded>
			)
			expect(screen.getByText('Sample Text')).toBeOnTheScreen()
			expect(
				screen.queryByText('Ler mais', { exact: true })
			).not.toBeOnTheScreen()
		})

		it('should show read more action correctly', () => {
			customRender(<Text.Expanded>{mockText}</Text.Expanded>)

			fireEvent(
				screen.getByText(mockText, { exact: true }),
				'textLayout',
				eventOnTextLayout
			)

			expect(screen.getByText('Ler mais', { exact: true })).toBeOnTheScreen()
		})

		it('should show read less action correctly', async () => {
			customRender(<Text.Expanded>{mockText}</Text.Expanded>)

			fireEvent(
				screen.getByText(mockText, { exact: true }),
				'textLayout',
				eventOnTextLayout
			)

			await userEvent.press(screen.getByText('Ler mais', { exact: true }))

			expect(screen.getByText('Ler menos', { exact: true })).toBeOnTheScreen()
		})
	})
})
