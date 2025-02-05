import React, { memo } from 'react'

import { Loading, Text, TouchableOpacityBox } from '@/components/ui'

import { ButtonPreset, ButtonProps, ButtonState } from './Button.types'

const buttonPresets: Record<ButtonPreset, ButtonState> = {
	primary: {
		default: {
			container: {
				backgroundColor: 'primary',
			},
			content: { color: 'primaryContrast' },
		},
		disabled: {
			container: {
				backgroundColor: 'gray4',
			},
			content: { color: 'gray2' },
		},
	},
	outline: {
		default: {
			container: {
				borderWidth: 1,
				borderColor: 'primary',
			},
			content: { color: 'primary' },
		},
		disabled: {
			container: {
				borderWidth: 1,
				borderColor: 'gray4',
			},
			content: { color: 'gray2' },
		},
	},
	ghost: {
		default: {
			container: {
				backgroundColor: 'white70',
			},
			content: {
				color: 'grayBlack',
				textProps: {
					preset: 'paragraphSmall',
					bold: false,
				},
			},
		},
		disabled: {
			container: {
				backgroundColor: 'grayWhite',
			},
			content: { color: 'grayBlack' },
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
				<Loading color={buttonPreset.content.color} />
			) : (
				<Text
					preset="paragraphMedium"
					bold
					color={buttonPreset.content.color}
					{...buttonPreset.content.textProps}
				>
					{title}
				</Text>
			)}
		</TouchableOpacityBox>
	)
}

export const Button = memo(ButtonMemoized)
