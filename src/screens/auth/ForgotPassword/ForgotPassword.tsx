import React from 'react'

import { Button, Text, TextInput } from '@/components'
import { ScreenTemplate } from '@/templates'

export const ForgotPasswordScreen = () => {
	return (
		<ScreenTemplate canGoBack>
			<Text preset="headingLarge" mb="s16">
				Esqueci minha senha
			</Text>
			<Text preset="paragraphLarge" mb="s32">
				Digite seu e-mail e enviaremos as instruções para redefinição de senha
			</Text>
			<TextInput
				label="E-mail"
				placeholder="Digite seu e-mail"
				boxProps={{ mb: 's40' }}
			/>
			<Button title="Recuperar senha" />
		</ScreenTemplate>
	)
}
