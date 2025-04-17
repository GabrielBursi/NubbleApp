import { StyleProp, ViewStyle } from 'react-native'

import { BoxProps } from '@/components'

export type ScreenTemplateProps = {
	canGoBack?: boolean
	scrollable?: boolean
	title?: string
	HeaderComponent?: React.ReactNode
} & BoxProps

export type ContainerScreenProps = {
	children: React.ReactNode
	backgroundColor: string
	style?: StyleProp<ViewStyle>
}
