import React from 'react'

import { ScreenTemplate } from '@/templates'
import { Button, PasswordInput, Text, TextInput } from '@/components'
import { SignUpScreenProps } from '@/types/screens'

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
	const createAccount = () => {
		// TODO: sign up
		navigation.navigate('SuccessScreen', {
			title: 'Sua conta foi criada com sucesso!',
			description: 'Agora é só fazer login na nossa plataforma',
			icon: {
				name: 'checkRound',
				color: 'success',
			},
		})
	}

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
			<Button title="Criar uma conta" onPress={createAccount} />
		</ScreenTemplate>
	)
}
