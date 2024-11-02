import { ComponentProps } from 'react'
import { SRText } from './Text'
import { TextVariants } from '@/types/theme'

type SRTextProps = ComponentProps<typeof SRText>
export type TextProps = SRTextProps & {
	preset?: TextVariants
	bold?: boolean
	italic?: boolean
	semiBold?: boolean
}
