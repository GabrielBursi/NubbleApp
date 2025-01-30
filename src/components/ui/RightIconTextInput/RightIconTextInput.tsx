import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'

import { Box } from '@/components/ui/Box/Box'
import { Icon } from '@/components/ui/Icon/Icon'

import { RightIconTextInputProps } from './RightIconTextInput.types'

const RightIconTextInputMemoized = ({
	allowClear = true,
	isFocused = false,
	loading = false,
	rightIcon,
	onClear,
}: Readonly<RightIconTextInputProps>) => {
	if (loading)
		return (
			<Box justifyContent="center" ml="s16">
				<ActivityIndicator testID="spin-indicator" size="small" />
			</Box>
		)

	if (allowClear && isFocused)
		return (
			<Box
				justifyContent="center"
				ml="s16"
				accessible
				accessibilityLabel="clear"
				accessibilityHint="limpar campo"
			>
				<Icon name="close" size={10} color="gray3" onPress={onClear} />
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

export const RightIconTextInput = memo(RightIconTextInputMemoized)
