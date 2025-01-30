import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Box } from '@/components/ui/Box/Box'
import { Icon } from '@/components/ui/Icon/Icon'

import { RightIconTextInputProps } from './RightIconTextInput.types'

export const RightIconTextInput = ({
	allowClear = true,
	isFocused = false,
	loading = false,
	rightIcon,
}: Readonly<RightIconTextInputProps>) => {
	if (loading)
		return (
			<Box justifyContent="center" ml="s16">
				<ActivityIndicator testID="spin-indicator" size="small" />
			</Box>
		)

	if (allowClear && isFocused)
		return (
			<Box justifyContent="center" ml="s16">
				{/* TODO: criar ícone para clear */}
				<Icon name="trash" size={20} color="gray3" />
			</Box>
		)

	if (rightIcon)
		return (
			<Box justifyContent="center" ml="s16">
				{rightIcon}
			</Box>
		)

	return null
}
