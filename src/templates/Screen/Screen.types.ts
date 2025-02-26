import { ComponentProps } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import { Box } from '@/components'

export type ScreenTemplateProps = {
	canGoBack?: boolean
	scrollable?: boolean
	title?: string
	HeaderComponent?: React.ReactNode
} & ComponentProps<typeof Box>

export type ContainerScreenProps = {
	children: React.ReactNode
	backgroundColor: string
	style?: StyleProp<ViewStyle>
}
