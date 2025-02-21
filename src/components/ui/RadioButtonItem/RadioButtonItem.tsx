import React, { memo } from 'react'

import { Box, RadioButton, Text } from '@/components'
import { useRadioButton } from '@/hooks'

import { RadioButtonItemProps } from './RadioButtonItem.types'

const RadioButtonItemMemoized = ({
	label,
	description,
	side = 'left',
	checked = false,
	disabled = false,
	onChange,
	...radioButtonProps
}: Readonly<RadioButtonItemProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, disabled, onChange })

	return (
		<Box paddingVertical="s16">
			<Box
				flexDirection="row"
				alignItems="flex-start"
				justifyContent="space-between"
				gap="s8"
			>
				{side === 'left' && (
					<Box gap="s4" flex={1}>
						<Text onPress={internalOnChange} semiBold>
							{label}
						</Text>
						{description && (
							<Text.Expanded onPress={internalOnChange}>
								{description}
							</Text.Expanded>
						)}
					</Box>
				)}
				<RadioButton
					{...radioButtonProps}
					disabled={disabled}
					aria-label={label}
					accessibilityLabel={label}
					checked={internalChecked}
					onChange={internalOnChange}
				/>
				{side === 'right' && (
					<Box gap="s4" flex={1}>
						<Text onPress={internalOnChange} semiBold>
							{label}
						</Text>
						{description && (
							<Text.Expanded onPress={internalOnChange}>
								{description}
							</Text.Expanded>
						)}
					</Box>
				)}
			</Box>
		</Box>
	)
}

export const RadioButtonItem = memo(RadioButtonItemMemoized)
