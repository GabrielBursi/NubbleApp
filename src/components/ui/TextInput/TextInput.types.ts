import { ComponentProps } from 'react'
import { TextInputProps as RNTextInputProps } from 'react-native'

import { Box } from '@/components/ui'
import { StrictOmit } from '@/types/utils'

export type TextInputProps = StrictOmit<RNTextInputProps, 'editable'> & {
	label: string
	errorMessage?: string
	RightComponent?: React.ReactElement
	boxProps?: ComponentProps<typeof Box>
	disabled?: boolean
}
