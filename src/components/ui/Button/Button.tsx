import React, { memo } from 'react'

import { Loading, Text, TouchableOpacityBox } from '@/components/ui'

import { ButtonPreset, ButtonProps, ButtonState } from './Button.types'

const buttonPresets: Record<ButtonPreset, ButtonState> = {
	primary: {
		default: {
			container: {
				backgroundColor: 'primary',
			},
			content: 'primaryContrast',
		},
		disabled: {
			container: {
				backgroundColor: 'gray4',
			},
			content: 'gray2',
		},
	},
	outline: {
		default: {
			container: {
				borderWidth: 1,
				borderColor: 'primary',
			},
			content: 'primary',
		},
		disabled: {
			container: {
				borderWidth: 1,
				borderColor: 'gray4',
			},
			content: 'gray2',
		},
	},
}

const ButtonMemoized = ({
	title,
	loading = false,
	preset = 'primary',
	disabled = false,
	...touchableOpacityBoxProps
}: Readonly<ButtonProps>) => {
	const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default']
	return (
		<TouchableOpacityBox
			disabled={disabled || loading}
			paddingHorizontal="s20"
			height={50}
			alignItems="center"
			justifyContent="center"
			borderRadius="s16"
			role="button"
			aria-label={title}
			accessible
			accessibilityRole="button"
			{...buttonPreset.container}
			{...touchableOpacityBoxProps}
		>
			{loading ? (
				<Loading color={buttonPreset.content} />
			) : (
				<Text preset="paragraphMedium" bold color={buttonPreset.content}>
					{title}
				</Text>
			)}
		</TouchableOpacityBox>
	)
}

export const Button = memo(ButtonMemoized)
