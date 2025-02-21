import React, { memo, useCallback, useEffect, useState } from 'react'

import { Box, PressableBox } from '@/components'

import { RadioButtonProps } from './RadioButton.types'

const RadioButtonMemoized = ({
	checked = false,
	onChange,
	disabled = false,
	...props
}: Readonly<RadioButtonProps>) => {
	const [internalValue, setInternalValue] = useState(checked)

	const handleChangeValue = useCallback(() => {
		setInternalValue((old) => {
			onChange?.(!old)
			return !old
		})
	}, [onChange])

	useEffect(() => {
		setInternalValue(checked)
	}, [checked])

	return (
		<PressableBox
			{...props}
			hitSlop={10}
			onPress={handleChangeValue}
			justifyContent="center"
			alignItems="center"
			height={20}
			width={20}
			borderWidth={internalValue ? 2 : 1}
			borderRadius={'s12'}
			borderColor={internalValue ? 'primary' : undefined}
			accessible
			accessibilityState={{ checked: internalValue, disabled }}
			role="radio"
			accessibilityRole="radio"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ opacity: disabled ? 0.5 : 1 }}
		>
			{internalValue && (
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
