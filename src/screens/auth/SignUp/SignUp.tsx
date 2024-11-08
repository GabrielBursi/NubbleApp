import React from 'react'

import { ScreenTemplate } from '@/templates'
import { Button, PasswordInput, Text, TextInput } from '@/components'

export const SignUpScreen = () => {
	return (
		<ScreenTemplate canGoBack scrollable>
			<Text preset="headingLarge" mb="s32">
				Criar uma conta
			</Text>
			<TextInput label="Seu username" placeholder="@" />
			<TextInput label="Nome Completo" placeholder="Digite seu nome completo" />
			<TextInput label="E-mail" placeholder="Digite seu e-mail" />
			<PasswordInput
				label="Senha"
				placeholder="Digite sua senha"
				boxProps={{ mb: 's48' }}
			/>
			<Button title="Criar uma conta" />
		</ScreenTemplate>
	)
}
