import { useCallback, useMemo } from 'react'
import { TextStyle } from 'react-native'
import { TextVariants } from '@/types/theme'
import { themeConfig } from '@/styles'

export const useFontFamily = () => {
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
				return italic
					? themeConfig.font.family.boldItalic
					: themeConfig.font.family.bold
			}
			switch (true) {
				case bold && italic:
					return themeConfig.font.family.boldItalic
				case bold:
					return themeConfig.font.family.bold
				case semiBold && italic:
					return themeConfig.font.family.mediumItalic
				case italic:
					return themeConfig.font.family.italic
				case semiBold:
					return themeConfig.font.family.medium
				default:
					return themeConfig.font.family.regular
			}
		},
		[]
	)

	return {
		fontSizes,
		getFontFamily,
	} as const
}
