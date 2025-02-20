import { FlashListProps } from '@shopify/flash-list'

import { StrictOmit } from '@/types/utils'

import { MenuItemProps } from '../MenuItem/MenuItem.types'

export type MenuItemListProps = {
	/** @default [] */
	items?: MenuItemProps[]
} & StrictOmit<
	FlashListProps<MenuItemProps>,
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
>
