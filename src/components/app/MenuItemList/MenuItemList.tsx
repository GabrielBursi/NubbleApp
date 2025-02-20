import React, { memo } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Divider, MenuItem } from '@/components'

import { MenuItemListProps } from './MenuItemList.types'

const MenuItemListMemoized = ({
	items = [],
	...props
}: Readonly<MenuItemListProps>) => {
	return (
		<FlashList
			{...props}
			showsHorizontalScrollIndicator={false}
			data={items}
			bounces={false}
			keyExtractor={(menuItem, index) => `${menuItem.label}-${index}`}
			renderItem={({ item: menuItem }) => <MenuItem {...menuItem} />}
			ItemSeparatorComponent={Divider}
			estimatedItemSize={400 * 60}
			disableAutoLayout
			accessible
			accessibilityLabel="menu"
			aria-label="menu"
			role="menu"
			accessibilityRole="menu"
		/>
	)
}

export const MenuItemList = memo(MenuItemListMemoized)
