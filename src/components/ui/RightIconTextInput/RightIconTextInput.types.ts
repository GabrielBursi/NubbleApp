import { IconProps } from '../Icon/Icon.types'
import { TextInputProps } from '../TextInput/TextInput.types'

export type RightIconTextInputProps = Pick<
	TextInputProps,
	'loading' | 'allowClear' | 'value'
> & {
	rightIcon?: React.ReactElement
	/** @default false */
	isFocused?: boolean
	onClear?: IconProps['onPress']
}
