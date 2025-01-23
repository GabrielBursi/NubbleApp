import React, { RefObject, useCallback, useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

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

	const userNameRef = useRef<RNTextInput>(null)
	const nameRef = useRef<RNTextInput>(null)
	const lastNameRef = useRef<RNTextInput>(null)
	const emailRef = useRef<RNTextInput>(null)
	const passwordRef = useRef<RNTextInput>(null)

	const handleSignUp = useCallback(
		(formValues: SignUpSchema) => signUp(formValues),
		[signUp]
	)

	const handleSubmitField = useCallback((refField: RefObject<RNTextInput>) => {
		refField.current?.focus()
	}, [])

	const handleNameFocusSubmitEditing = useCallback(
		() => handleSubmitField(nameRef),
		[handleSubmitField]
	)

	const handleLastNameFocusSubmitEditing = useCallback(
		() => handleSubmitField(lastNameRef),
		[handleSubmitField]
	)

	const handleEmailFocusSubmitEditing = useCallback(
		() => handleSubmitField(emailRef),
		[handleSubmitField]
	)

	const handlePasswordFocusSubmitEditing = useCallback(
		() => handleSubmitField(passwordRef),
		[handleSubmitField]
	)

	const handleSubmitErrors: SubmitErrorHandler<SignUpSchema> = useCallback(
		(fieldErrors) => {
			const fields = [
				{ ref: userNameRef, error: fieldErrors.username },
				{ ref: nameRef, error: fieldErrors.firstName },
				{ ref: lastNameRef, error: fieldErrors.lastName },
				{ ref: emailRef, error: fieldErrors.email },
				{ ref: passwordRef, error: fieldErrors.password },
			]

			const firstErrorField = fields.find((field) => !!field.error)
			firstErrorField?.ref.current?.focus()
		},
		[]
	)

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
				loading={userNameIsFetching}
				ref={userNameRef}
				returnKeyType="next"
				onSubmitEditing={handleNameFocusSubmitEditing}
			/>
			<ControlledFormInput
				control={control}
				name="firstName"
				autoCapitalize="words"
				label="Nome"
				placeholder="Digite seu nome"
				boxProps={{ mb: 's20' }}
				ref={nameRef}
				returnKeyType="next"
				onSubmitEditing={handleLastNameFocusSubmitEditing}
			/>
			<ControlledFormInput
				control={control}
				name="lastName"
				autoCapitalize="words"
				label="Sobrenome"
				placeholder="Digite seu sobrenome"
				boxProps={{ mb: 's20' }}
				ref={lastNameRef}
				returnKeyType="next"
				onSubmitEditing={handleEmailFocusSubmitEditing}
			/>
			<ControlledFormInput.Email
				control={control}
				name="email"
				errorMessage={emailIsUnvailable ? 'email indisponível' : undefined}
				loading={emailIsFetching}
				ref={emailRef}
				returnKeyType="next"
				onSubmitEditing={handlePasswordFocusSubmitEditing}
			/>
			<ControlledFormInput.Password
				control={control}
				name="password"
				placeholder="Digite sua senha"
				boxProps={{ mb: 's48' }}
				ref={passwordRef}
				returnKeyType="done"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onSubmitEditing={handleSubmit(handleSignUp, handleSubmitErrors)}
			/>
			<Button
				loading={isLoading}
				disabled={!isValid || userNameIsUnvailable || emailIsUnvailable}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onPress={handleSubmit(handleSignUp, handleSubmitErrors)}
				title="Criar uma conta"
			/>
		</ScreenTemplate>
	)
}
