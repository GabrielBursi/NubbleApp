import { useCallback, useMemo } from 'react'
import { TextStyle } from 'react-native'
import {
	TextVariants,
	ThemeFontFamily,
	ThemeFontFamilyKeys,
} from '@/types/theme'

export const useFontFamily = () => {
	const fontFamily: Record<ThemeFontFamilyKeys, ThemeFontFamily> = useMemo(
		() => ({
			black: 'Satoshi-Black',
			blackItalic: 'Satoshi-BlackItalic',
			bold: 'Satoshi-Bold',
			boldItalic: 'Satoshi-BoldItalic',
			italic: 'Satoshi-Italic',
			light: 'Satoshi-Light',
			lightItalic: 'Satoshi-LightItalic',
			medium: 'Satoshi-Medium',
			mediumItalic: 'Satoshi-MediumItalic',
			regular: 'Satoshi-Regular',
		}),
		[]
	)

	const fontSizes: Record<TextVariants, TextStyle> = useMemo(
		() => ({
			headingLarge: { fontSize: 32, lineHeight: 38.4 },
			headingMedium: { fontSize: 22, lineHeight: 26.4 },
			headingSmall: { fontSize: 18, lineHeight: 23.4 },

			paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
			paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
			paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

			paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
			paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 },
		}),
		[]
	)

	const getFontFamily = useCallback(
		(
			preset: TextVariants,
			bold?: boolean,
			italic?: boolean,
			semiBold?: boolean
		) => {
			if (
				preset === 'headingLarge' ||
				preset === 'headingMedium' ||
				preset === 'headingSmall'
			) {
				return italic ? fontFamily.boldItalic : fontFamily.bold
			}
			switch (true) {
				case bold && italic:
					return fontFamily.boldItalic
				case bold:
					return fontFamily.bold
				case semiBold && italic:
					return fontFamily.mediumItalic
				case italic:
					return fontFamily.italic
				case semiBold:
					return fontFamily.medium
				default:
					return fontFamily.regular
			}
		},
		[fontFamily]
	)

	return {
		fontFamily,
		fontSizes,
		getFontFamily,
	} as const
}
