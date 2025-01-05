import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, ControlledFormInput, Text } from '@/components'
import { useAuthLogin } from '@/domain/Auth'
import { useToastService } from '@/services/toast'
import { ScreenTemplate } from '@/templates'
import { loginSchema, LoginSchema } from '@/types/form'
import { LoginScreenProps } from '@/types/screens'

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
	const { showToast } = useToastService()
	const { isLoading, login } = useAuthLogin({
		onError: (message) => showToast({ message, type: 'error' }),
	})

	const submitLogin = (formValues: LoginSchema) => {
		login(formValues)
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
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onPress={handleSubmit(submitLogin)}
				disabled={!isValid}
				marginTop="s48"
				title="Entrar"
			/>
			<Button
				loading={isLoading}
				onPress={navigateToSignUpScreen}
				preset="outline"
				marginTop="s12"
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
