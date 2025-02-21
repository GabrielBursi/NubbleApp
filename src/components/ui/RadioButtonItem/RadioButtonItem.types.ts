import { StrictOmit } from '@/types/utils'

import { RadioButtonProps } from '../RadioButton/RadioButton.types'

export type RadioButtonItemProps = {
	label: string
	description?: string
	/**
	 * @description side that the content will be place
	 * @default 'left'
	 *  */
	side?: 'left' | 'right'
} & StrictOmit<RadioButtonProps, 'aria-label' | 'accessibilityLabel'>
