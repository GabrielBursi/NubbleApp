import React, { memo } from 'react'

import { Box, PressableBox } from '@/components'
import { useRadioButton } from '@/hooks'

import { RadioButtonProps } from './RadioButton.types'

const RadioButtonMemoized = ({
	checked = false,
	onChange,
	disabled = false,
	...props
}: Readonly<RadioButtonProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, disabled, onChange })

	return (
		<PressableBox
			{...props}
			hitSlop={10}
			onPress={internalOnChange}
			justifyContent="center"
			alignItems="center"
			height={20}
			width={20}
			borderWidth={internalChecked ? 2 : 1}
			borderRadius={'s12'}
			borderColor={internalChecked ? 'primary' : undefined}
			accessible
			accessibilityState={{ checked: internalChecked, disabled }}
			role="radio"
			accessibilityRole="radio"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ opacity: disabled ? 0.5 : 1 }}
		>
			{internalChecked && (
				<Box
					backgroundColor={'primary'}
					height={12}
					width={12}
					borderRadius="s12"
					opacity={disabled ? 0.5 : 1}
				/>
			)}
		</PressableBox>
	)
}

export const RadioButton = memo(RadioButtonMemoized)
