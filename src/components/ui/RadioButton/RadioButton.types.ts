import { StrictOmit } from '@/types/utils'

import { PressableBoxProps } from '../PressableBox/PressableBox.types'

export type RadioButtonProps = {
	/** @default false */
	checked?: boolean
	/** @default false */
	disabled?: boolean
	onChange?: (value: boolean) => void
} & StrictOmit<
	PressableBoxProps,
	| 'hitSlop'
	| 'onPress'
	| 'justifyContent'
	| 'alignItems'
	| 'height'
	| 'width'
	| 'borderWidth'
	| 'borderRadius'
	| 'borderColor'
	| 'accessible'
	| 'role'
	| 'disabled'
>
