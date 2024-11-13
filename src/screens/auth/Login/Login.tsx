import React from 'react'

import { ScreenTemplate } from '@/templates'
import { Button, PasswordInput, Text, TextInput } from '@/components'
import { LoginScreenProps } from '@/types/screens'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
	const navigateToSignUpScreen = () => {
		navigation.navigate('SignUpScreen')
	}
	const navigateToForgotPasswordScreen = () => {
		navigation.navigate('ForgotPasswordScreen')
	}

	return (
		<ScreenTemplate scrollable>
			<Text marginBottom="s8" preset="headingLarge">
				Olá
			</Text>
			<Text preset="paragraphLarge" mb="s40">
				Digite seu e-mail e senha para entrar
			</Text>
			<TextInput label="E-mail" placeholder="Digite seu e-mail" />
			<PasswordInput label="Senha" placeholder="Digite sua senha" />
			<Text
				onPress={navigateToForgotPasswordScreen}
				color="primary"
				preset="paragraphSmall"
				bold
			>
				Esqueci minha senha
			</Text>
			<Button marginTop="s48" title="Entrar" />
			<Button
				onPress={navigateToSignUpScreen}
				preset="outline"
				marginTop="s12"
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
