import React, { forwardRef, memo } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Icon, TextInput } from '@/components'

import { EmailInputProps } from './EmailInput.types'

const EmailInputMemoized = forwardRef<RNTextInput, Readonly<EmailInputProps>>(
	({ label = 'E-mail', ...props }, ref) => {
		return (
			<TextInput
				label={label}
				ref={ref}
				placeholder="Digite seu e-mail"
				RightComponent={<Icon color="gray2" name={'message'} />}
				{...props}
				keyboardType="email-address"
				autoCapitalize="none"
				autoComplete="email"
				autoCorrect={false}
			/>
		)
	}
)

export const EmailInput = memo(EmailInputMemoized)
