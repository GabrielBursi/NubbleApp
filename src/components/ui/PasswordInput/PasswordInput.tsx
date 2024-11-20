import React, { memo, useState } from 'react'

import { Icon, TextInput } from '@/components/ui'

import { PasswordInputProps } from './PasswordInput.types'

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
