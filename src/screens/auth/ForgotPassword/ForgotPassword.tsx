import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, ControlledFormInput, Text } from '@/components'
import { ScreenTemplate } from '@/templates'
import { useResetNavigation } from '@/hooks'
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/types/form'

export const ForgotPasswordScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	})

	const retrievePassword = (formValues: ForgotPasswordSchema) => {
		console.log(formValues)
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
			<ControlledFormInput
				control={control}
				name="email"
				label="E-mail"
				placeholder="Digite seu e-mail"
			/>
			<Button
				disabled={!isValid}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onPress={handleSubmit(retrievePassword)}
				title="Recuperar senha"
			/>
		</ScreenTemplate>
	)
}
