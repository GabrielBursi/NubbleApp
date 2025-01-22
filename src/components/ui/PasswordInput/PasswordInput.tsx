import React, { forwardRef, memo, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Icon, TextInput } from '@/components/ui'

import { PasswordInputProps } from './PasswordInput.types'

const PasswordInputMemoized = forwardRef<
	RNTextInput,
	Readonly<PasswordInputProps>
>(({ label = 'Senha', ...props }, ref) => {
	const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

	const toggleSecureTextEntry = () => {
		setIsSecureTextEntry((prev) => !prev)
	}

	return (
		<TextInput
			label={label}
			placeholder="Digite sua senha"
			{...props}
			ref={ref}
			RightComponent={
				<Icon
					onPress={toggleSecureTextEntry}
					color="gray2"
					name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
				/>
			}
			secureTextEntry={isSecureTextEntry}
		/>
	)
})

export const PasswordInput = memo(PasswordInputMemoized)
