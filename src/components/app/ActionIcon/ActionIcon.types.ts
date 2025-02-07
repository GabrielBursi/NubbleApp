import { ButtonProps } from 'react-native'

import { IconProps } from '@/components/ui/Icon/Icon.types'
import { StrictOmit } from '@/types/utils'

export type ActionIconProps = {
	label?: number | string
	/** @default right */
	positionLabel?: 'right' | 'left'
	name: {
		default: IconProps['name']
		marked?: IconProps['name']
	}
} & Pick<ButtonProps, 'onPress'> &
	StrictOmit<IconProps, 'name' | 'onPress'>
