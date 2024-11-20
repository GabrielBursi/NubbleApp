import { ButtonProps } from 'react-native'

import { IconProps } from '@/components/ui/Icon/Icon.types'

export type ActionIconProps = {
	marked?: boolean
	count?: number
	icon: {
		default: IconProps['name']
		marked: IconProps['name']
	}
} & Pick<ButtonProps, 'onPress'>
