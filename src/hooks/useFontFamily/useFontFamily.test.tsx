import { renderHook } from '@testing-library/react-native'

import { useFontFamily } from './useFontFamily'

describe('useFontFamily', () => {
	it('should return the bold font for heading presets without italic', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('headingLarge')).toBe('Satoshi-Bold')
		expect(result.current.getFontFamily('headingMedium')).toBe('Satoshi-Bold')
		expect(result.current.getFontFamily('headingSmall')).toBe('Satoshi-Bold')
	})

	it('should return the boldItalic font for heading presets with italic', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('headingLarge', false, true)).toBe(
			'Satoshi-BoldItalic'
		)
		expect(result.current.getFontFamily('headingMedium', false, true)).toBe(
			'Satoshi-BoldItalic'
		)
		expect(result.current.getFontFamily('headingSmall', false, true)).toBe(
			'Satoshi-BoldItalic'
		)
	})

	it('should return boldItalic when bold bold and italic are true', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('paragraphCaption', true, true)).toBe(
			'Satoshi-BoldItalic'
		)
	})

	it('should return bold when only bold is true', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('paragraphCaption', true)).toBe(
			'Satoshi-Bold'
		)
	})

	it('should return italic when only italic is true', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('paragraphCaption', false, true)).toBe(
			'Satoshi-Italic'
		)
	})

	it('should return mediumItalic when bold semiBold and italic are true', () => {
		const { result } = renderHook(useFontFamily)
		expect(
			result.current.getFontFamily('paragraphCaption', false, true, true)
		).toBe('Satoshi-MediumItalic')
	})

	it('should return medium when only semiBold is true', () => {
		const { result } = renderHook(useFontFamily)
		expect(
			result.current.getFontFamily('paragraphCaption', false, false, true)
		).toBe('Satoshi-Medium')
	})

	it('should return regular by default', () => {
		const { result } = renderHook(useFontFamily)
		expect(result.current.getFontFamily('paragraphCaption')).toBe(
			'Satoshi-Regular'
		)
	})
})
