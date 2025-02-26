import React, { memo } from 'react'

import { Icon, PressableBox, Text } from '@/components'

import { MenuItemProps } from './MenuItem.types'

const MenuItemMemoized = ({ label, onPress }: Readonly<MenuItemProps>) => {
	return (
		<PressableBox
			onPress={onPress}
			flexDirection="row"
			alignItems="center"
			paddingVertical="s16"
			justifyContent="space-between"
			accessible
			role="menuitem"
			accessibilityRole="menuitem"
			accessibilityLabel={label}
		>
			<Text semiBold>{label}</Text>
			<Icon name="chevronRight" />
		</PressableBox>
	)
}

export const MenuItem = memo(MenuItemMemoized)
