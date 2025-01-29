import { ComponentProps } from 'react'

import { TextVariants } from '@/types/theme'
import { StrictOmit } from '@/types/utils'

import { SRText } from './Text'

type SRTextProps = ComponentProps<typeof SRText>
export type TextProps = StrictOmit<SRTextProps, 'children' | 'accessible'> & {
	preset?: TextVariants
	bold?: boolean
	italic?: boolean
	semiBold?: boolean
	children: string
}

export type ExpandableTextProps = StrictOmit<
	TextProps,
	'ellipsizeMode' | 'onTextLayout'
>
