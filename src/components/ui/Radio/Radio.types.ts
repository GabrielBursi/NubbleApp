import { FlashListProps } from '@shopify/flash-list'

import { StrictOmit } from '@/types/utils'

import { PressableBoxProps } from '../PressableBox/PressableBox.types'

export type RadioProps = {
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
	'label' | 'description' | 'onChange' | 'checked'
>

export type RadioItem<TItem extends Record<string, unknown>> = TItem &
	RadioItemProps

export type RadioGroupProps<TItem extends Record<string, unknown>> = {
	items: RadioItem<TItem>[]
	labelKey: keyof TItem
	descriptionKey?: keyof TItem
	initialSelectedIndex?: number
	onOptionSelect?: (
		item: TItem,
		checked: Required<RadioButtonProps>['checked']
	) => void
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
