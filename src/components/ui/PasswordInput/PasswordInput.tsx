import React, { memo, useState } from 'react'

import { PasswordInputProps } from './PasswordInput.types'

import { Icon, TextInput } from '@/components/ui'

const PasswordInputMemoized = (props: Readonly<PasswordInputProps>) => {
	const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

	const toggleSecureTextEntry = () => {
		setIsSecureTextEntry((prev) => !prev)
	}

	return (
		<TextInput
			{...props}
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
}

export const PasswordInput = memo(PasswordInputMemoized)
