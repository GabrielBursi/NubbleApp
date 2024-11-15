import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ScreenTemplate } from '@/templates'
import { Button, ControlledFormInput, Text } from '@/components'
import { LoginScreenProps } from '@/types/screens'
import { loginSchema, LoginSchema } from '@/types/form'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<LoginSchema>({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const submitLogin = (formValues: LoginSchema) => {
		console.log(formValues)
		navigation.navigate('HomeScreen')
	}

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
			/>
			<Text
				onPress={navigateToForgotPasswordScreen}
				color="primary"
				preset="paragraphSmall"
				bold
			>
				Esqueci minha senha
			</Text>
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onPress={handleSubmit(submitLogin)}
				disabled={!isValid}
				marginTop="s48"
				title="Entrar"
			/>
			<Button
				onPress={navigateToSignUpScreen}
				preset="outline"
				marginTop="s12"
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
