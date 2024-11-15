import React from 'react'
import { useForm } from 'react-hook-form'

import { ScreenTemplate } from '@/templates'
import { Button, ControlledFormInput, Text } from '@/components'
import { LoginScreenProps } from '@/types/screens'
import { LoginFormValues } from '@/types/form'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<LoginFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const submitLogin = (formValues: LoginFormValues) => {
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
			<ControlledFormInput.Password
				control={control}
				name="password"
				rules={{
					required: 'Senha obrigatória',
					minLength: {
						value: 8,
						message: 'Senha deve ter no mínimo 8 caracteres',
					},
				}}
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
