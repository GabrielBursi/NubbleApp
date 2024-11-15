import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, ControlledFormInput, Text } from '@/components'
import { ScreenTemplate } from '@/templates'
import { useResetNavigation } from '@/hooks'
import { ForgotPasswordFormValues } from '@/types/form'

export const ForgotPasswordScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<ForgotPasswordFormValues>({
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	})

	const retrievePassword = (formValues: ForgotPasswordFormValues) => {
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
				rules={{
					required: 'E-mail obrigatório',
					pattern: {
						value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						message: 'E-mail inválido',
					},
				}}
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
