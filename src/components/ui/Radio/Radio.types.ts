import { FlashListProps } from '@shopify/flash-list'

import { StrictOmit } from '@/types/utils'

import { PressableBoxProps } from '../PressableBox/PressableBox.types'

export type RadioProps = {
	/** @default false */
	checked?: boolean
	/** @default false */
	disabled?: boolean
	/** @default true */
	canUncheck?: boolean
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

export type RadioButtonProps = {
	label: string
	description?: string
	/**
	 * @description side that the content will be place
	 * @default 'left'
	 *  */
	side?: 'left' | 'right'
} & StrictOmit<RadioProps, 'aria-label' | 'accessibilityLabel'>

type RadioItemProps = StrictOmit<
	RadioButtonProps,
	'label' | 'description' | 'onChange' | 'checked' | 'canUncheck'
>

export type RadioItem<TItem extends Record<string, unknown>> = TItem &
	RadioItemProps

export type OptionSelected<TItem extends Record<string, unknown>> = {
	option: TItem
	index: number
	checked: boolean
}

export type RadioGroupProps<TItem extends Record<string, unknown>> = {
	items: RadioItem<TItem>[]
	labelKey: keyof TItem
	descriptionKey?: keyof TItem
	initialSelectedIndex?: number
	onOptionSelect?: (opt: OptionSelected<TItem>) => void
} & StrictOmit<
	FlashListProps<TItem>,
	| 'data'
	| 'bounces'
	| 'keyExtractor'
	| 'renderItem'
	| 'ItemSeparatorComponent'
	| 'estimatedItemSize'
	| 'disableAutoLayout'
	| 'accessible'
	| 'accessibilityLabel'
	| 'aria-label'
	| 'role'
	| 'accessibilityRole'
	| 'showsHorizontalScrollIndicator'
>
