import { ComponentProps } from 'react'

import { TextVariants } from '@/types/theme'

import { SRText } from './Text'

type SRTextProps = ComponentProps<typeof SRText>
export type TextProps = SRTextProps & {
	preset?: TextVariants
	bold?: boolean
	italic?: boolean
	semiBold?: boolean
}
