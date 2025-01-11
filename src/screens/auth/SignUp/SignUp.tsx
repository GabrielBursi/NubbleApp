import React from 'react'
import { ActivityIndicator } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, ControlledFormInput, Text } from '@/components'
import { useAuthSignUp, useAuthValueIsAvailable } from '@/domain/Auth'
import { useResetNavigation } from '@/hooks'
import { ScreenTemplate } from '@/templates'
import { AppQueryKeys } from '@/types/api'
import { signUpSchema, SignUpSchema } from '@/types/form'

export const SignUpScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
		getFieldState,
		watch,
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

	const userNameValue = watch('username')
	const userNameState = getFieldState('username')
	const emailValue = watch('email')
	const emailState = getFieldState('email')

	const { isUnvailable: userNameIsUnvailable, isFetching: userNameIsFetching } =
		useAuthValueIsAvailable({
			queryKey: AppQueryKeys.USERNAME_AVAILABLE,
			value: userNameValue,
			enabled: !userNameState.invalid,
		})
	const { isUnvailable: emailIsUnvailable, isFetching: emailIsFetching } =
		useAuthValueIsAvailable({
			queryKey: AppQueryKeys.EMAIL_AVAILABLE,
			value: emailValue,
			enabled: !emailState.invalid,
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
				errorMessage={userNameIsUnvailable ? 'usuário indisponível' : undefined}
				RightComponent={
					userNameIsFetching ? <ActivityIndicator size="small" /> : undefined
				}
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
				errorMessage={emailIsUnvailable ? 'email indisponível' : undefined}
				RightComponent={
					emailIsFetching ? <ActivityIndicator size="small" /> : undefined
				}
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
				disabled={!isValid || userNameIsUnvailable || emailIsUnvailable}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onPress={handleSubmit(handleSignUp)}
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
