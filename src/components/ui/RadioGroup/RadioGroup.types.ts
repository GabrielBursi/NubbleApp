import { FlashListProps } from '@shopify/flash-list'

import { StrictOmit } from '@/types/utils'

import { RadioButtonProps } from '../RadioButton/RadioButton.types'
import { RadioButtonItemProps } from '../RadioButtonItem/RadioButtonItem.types'

type RadioItemProps = StrictOmit<
	RadioButtonItemProps,
	'label' | 'description' | 'onChange' | 'checked'
>

export type RadioItem<TItem extends Record<string, unknown>> = TItem &
	RadioItemProps

export type RadioGroupProps<TItem extends Record<string, unknown>> = {
	items: RadioItem<TItem>[]
	labelKey: keyof TItem
	descriptionKey?: keyof TItem
	initialItemIndexSelected?: number
	onSelect?: (
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
