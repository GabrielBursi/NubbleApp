import React, { memo, PropsWithChildren } from 'react'

import { createText } from '@shopify/restyle'

import { useFontFamily } from '@/hooks'
import { AppTheme } from '@/types/theme'

import { TextProps } from './Text.types'

export const SRText = createText<AppTheme>()

const TextMemoized = ({
	children,
	preset = 'paragraphMedium',
	bold,
	italic,
	semiBold,
	style,
	...sRTextProps
}: Readonly<PropsWithChildren<TextProps>>) => {
	const { getFontFamily, fontSizes } = useFontFamily()
	const fontFamily = getFontFamily(preset, bold, italic, semiBold)

	return (
		<SRText
			color="backgroundContrast"
			style={[fontSizes[preset], { fontFamily }, style]}
			{...sRTextProps}
		>
			{children}
		</SRText>
	)
}

export const Text = memo(TextMemoized)
