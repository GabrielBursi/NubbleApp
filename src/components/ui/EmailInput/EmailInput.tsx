import React, { memo } from 'react'

import { Icon, TextInput } from '@/components'

import { EmailInputProps } from './EmailInput.types'

const EmailInputMemoized = ({
	label = 'E-mail',
	...props
}: Readonly<EmailInputProps>) => {
	return (
		<TextInput
			label={label}
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

export const EmailInput = memo(EmailInputMemoized)
