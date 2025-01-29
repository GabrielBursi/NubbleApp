import { PressableProps } from 'react-native'

import { TextProps } from '@/components/ui/Text/Text.types'
import { StrictOmit } from '@/types/utils'

export type SeeMoreProps = {
	handleExpanded?: PressableProps['onPress']
	/** @default false */
	expanded?: boolean
	/** @default 'Ver mais' */
	textSeeMore?: string
	/** @default 'Ver menos' */
	textSeeLess?: string
} & StrictOmit<TextProps, 'children' | 'bold' | 'color'>
