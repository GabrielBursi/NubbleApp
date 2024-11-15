import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ScreenTemplate } from '@/templates'
import { Button, ControlledFormInput, Text } from '@/components'
import { useResetNavigation } from '@/hooks'
import { signUpSchema, SignUpSchema } from '@/types/form'

export const SignUpScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			fullName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const createAccount = (formValues: SignUpSchema) => {
		console.log(formValues)
		// TODO: sign up
		resetSuccess({
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
			<ControlledFormInput
				control={control}
				name="username"
				label="Seu username"
				placeholder="@"
			/>
			<ControlledFormInput
				control={control}
				name="fullName"
				autoCapitalize="words"
				label="Nome Completo"
				placeholder="Digite seu nome completo"
			/>
			<ControlledFormInput
				control={control}
				name="email"
				label="E-mail"
				placeholder="Digite seu e-mail"
			/>
			<ControlledFormInput.Password
				control={control}
				name="password"
				label="Senha"
				placeholder="Digite sua senha"
				boxProps={{ mb: 's48' }}
			/>
			<Button
				disabled={!isValid}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onPress={handleSubmit(createAccount)}
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
