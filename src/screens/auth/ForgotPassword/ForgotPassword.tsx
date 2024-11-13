import React from 'react'

import { Button, Text, TextInput } from '@/components'
import { ScreenTemplate } from '@/templates'
import { useResetNavigation } from '@/hooks'

export const ForgotPasswordScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const retrievePassword = () => {
		//TODO: recuperar senha

		resetSuccess({
			title: `Enviamos as instruções para seu  ${'\n'}e-mail`,
			description:
				'Clique no link enviado no seu e-mail para recuperar sua senha',
			icon: {
				name: 'messageRound',
				color: 'primary',
			},
		})
	}

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
			<Button onPress={retrievePassword} title="Recuperar senha" />
		</ScreenTemplate>
	)
}
