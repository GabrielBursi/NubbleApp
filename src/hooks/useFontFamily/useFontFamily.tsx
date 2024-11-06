import { useCallback, useMemo } from 'react'
import { TextStyle } from 'react-native'
import { TextVariants } from '@/types/theme'
import { useAppTheme } from '@/hooks'

export const useFontFamily = () => {
	const { font } = useAppTheme()

	const fontSizes: Record<TextVariants, TextStyle> = useMemo(
		() => ({
			headingLarge: { fontSize: font.sizes.huge, lineHeight: 38.4 },
			headingMedium: { fontSize: font.sizes.xxlarge, lineHeight: 26.4 },
			headingSmall: { fontSize: font.sizes.xlarge, lineHeight: 23.4 },

			paragraphLarge: { fontSize: font.sizes.xlarge, lineHeight: 25.2 },
			paragraphMedium: { fontSize: font.sizes.large, lineHeight: 22.4 },
			paragraphSmall: { fontSize: font.sizes.medium, lineHeight: 19.6 },

			paragraphCaption: { fontSize: font.sizes.small, lineHeight: 16.8 },
			paragraphCaptionSmall: { fontSize: font.sizes.xsmall, lineHeight: 14 },
		}),
		[font]
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
				return italic ? font.family.boldItalic : font.family.bold
			}
			switch (true) {
				case bold && italic:
					return font.family.boldItalic
				case bold:
					return font.family.bold
				case semiBold && italic:
					return font.family.mediumItalic
				case italic:
					return font.family.italic
				case semiBold:
					return font.family.medium
				default:
					return font.family.regular
			}
		},
		[font]
	)

	return {
		fontSizes,
		getFontFamily,
	} as const
}
