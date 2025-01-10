import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, ControlledFormInput, Text } from '@/components'
import { useAuthSignUp } from '@/domain/Auth'
import { useResetNavigation } from '@/hooks'
import { ScreenTemplate } from '@/templates'
import { signUpSchema, SignUpSchema } from '@/types/form'

export const SignUpScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<SignUpSchema>({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const { signUp, isLoading } = useAuthSignUp({
		onSuccess: () => {
			resetSuccess({
				title: 'Sua conta foi criada com sucesso!',
				description: 'Agora é só fazer login na nossa plataforma',
				icon: {
					name: 'checkRound',
					color: 'success',
				},
			})
		},
	})

	const handleSignUp = (formValues: SignUpSchema) => signUp(formValues)

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
				name="firstName"
				autoCapitalize="words"
				label="Nome"
				placeholder="Digite seu nome"
				boxProps={{ mb: 's20' }}
			/>
			<ControlledFormInput
				control={control}
				name="lastName"
				autoCapitalize="words"
				label="Sobrenome"
				placeholder="Digite seu sobrenome"
				boxProps={{ mb: 's20' }}
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
				loading={isLoading}
				disabled={!isValid}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onPress={handleSubmit(handleSignUp)}
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
