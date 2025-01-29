import React, { memo, useCallback, useState } from 'react'
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'

import { createText } from '@shopify/restyle'

import { Box, SeeMore } from '@/components'
import { useFontFamily } from '@/hooks'
import { AppTheme } from '@/types/theme'

import { ExpandableTextProps, TextProps } from './Text.types'

export const SRText = createText<AppTheme>()

const TextMemoized = ({
	children,
	preset = 'paragraphMedium',
	bold,
	italic,
	semiBold,
	style,
	...sRTextProps
}: Readonly<TextProps>) => {
	const { getFontFamily, fontSizes } = useFontFamily()
	const fontFamily = getFontFamily(preset, bold, italic, semiBold)

	return (
		<SRText
			color="backgroundContrast"
			style={[fontSizes[preset], { fontFamily }, style]}
			{...sRTextProps}
			accessible
		>
			{children}
		</SRText>
	)
}

const TextInternal = memo(TextMemoized)

const ExpandableTextMemoized = ({
	children,
	numberOfLines = 4,
	...props
}: Readonly<ExpandableTextProps>) => {
	const [showReadMore, setShowReadMore] = useState(false)
	const [readMore, setReadMore] = useState(false)

	const onTextLayout = useCallback(
		(ev: NativeSyntheticEvent<TextLayoutEventData>) => {
			const lines = ev.nativeEvent.lines.length
			setShowReadMore(lines > numberOfLines)
		},
		[numberOfLines]
	)

	const toggleReadMore = useCallback(() => {
		setReadMore((old) => !old)
	}, [])

	return (
		<Box gap="s4">
			<TextInternal
				{...props}
				onTextLayout={onTextLayout}
				numberOfLines={readMore ? undefined : numberOfLines}
				ellipsizeMode={readMore ? undefined : 'tail'}
			>
				{children}
			</TextInternal>
			{showReadMore && (
				<SeeMore
					textSeeLess="Ler menos"
					textSeeMore="Ler mais"
					expanded={readMore}
					handleExpanded={toggleReadMore}
					preset="paragraphCaption"
				/>
			)}
		</Box>
	)
}

const ExpandableTextInternal = memo(ExpandableTextMemoized)

type TextInternal = typeof TextInternal
type ExpandedTextInternal = typeof ExpandableTextInternal
type CompoundTextComponent = TextInternal & {
	Expanded: ExpandedTextInternal
}

export const Text = TextInternal as CompoundTextComponent
Text.Expanded = ExpandableTextInternal
