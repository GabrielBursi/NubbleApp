import { ComponentProps } from 'react'

import { Box } from '@/components'

export type ScreenTemplateProps = {
	canGoBack?: boolean
	scrollable?: boolean
} & ComponentProps<typeof Box>

export type ContainerScreenProps = {
	children: React.ReactNode
	backgroundColor: string
}
