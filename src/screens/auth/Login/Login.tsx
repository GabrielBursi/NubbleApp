import React, { useCallback, useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

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

	const passwordRef = useRef<RNTextInput>(null)
	const emailRef = useRef<RNTextInput>(null)

	const submitLogin = useCallback(
		(formValues: LoginSchema) => {
			login(formValues)
		},
		[login]
	)

	const navigateToSignUpScreen = () => {
		navigation.navigate('SignUpScreen')
	}
	const navigateToForgotPasswordScreen = () => {
		navigation.navigate('ForgotPasswordScreen')
	}

	// TODO:REFACTOR
	const handleSubmitErrors: SubmitErrorHandler<LoginSchema> = useCallback(
		(fieldErrors) => {
			const fields = [
				{ ref: emailRef, error: fieldErrors.email },
				{ ref: passwordRef, error: fieldErrors.password },
			]

			const firstErrorField = fields.find((field) => !!field.error)
			firstErrorField?.ref.current?.focus()
		},
		[]
	)

	const handleSubmitEditingEmailInput = useCallback(() => {
		passwordRef.current?.focus()
	}, [])

	return (
		<ScreenTemplate scrollable>
			<Text marginBottom="s8" preset="headingLarge">
				Olá
			</Text>
			<Text preset="paragraphLarge" mb="s40">
				Digite seu e-mail e senha para entrar
			</Text>
			<ControlledFormInput.Email
				control={control}
				name="email"
				returnKeyType="next"
				onSubmitEditing={handleSubmitEditingEmailInput}
				ref={emailRef}
			/>
			<ControlledFormInput.Password
				control={control}
				name="password"
				returnKeyType="done"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onSubmitEditing={handleSubmit(submitLogin, handleSubmitErrors)}
				ref={passwordRef}
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
				onPress={handleSubmit(submitLogin, handleSubmitErrors)}
				disabled={!isValid}
				loading={isLoading}
				marginTop="s48"
				title="Entrar"
			/>
			<Button
				disabled={isLoading}
				onPress={navigateToSignUpScreen}
				preset="outline"
				marginTop="s12"
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
