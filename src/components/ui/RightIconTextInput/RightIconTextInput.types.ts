import { TextInputProps } from '../TextInput/TextInput.types'

export type RightIconTextInputProps = Pick<
	TextInputProps,
	'loading' | 'allowClear'
> & {
	rightIcon?: React.ReactElement
	/** @default false */
	isFocused?: boolean
}
