import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, ControlledFormInput, Text } from '@/components'
import { useAuthRequestNewPassword } from '@/domain/Auth'
import { useResetNavigation } from '@/hooks'
import { useToastService } from '@/services/toast'
import { ScreenTemplate } from '@/templates'
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/types/form'

export const ForgotPasswordScreen = () => {
	const { resetSuccess } = useResetNavigation()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<ForgotPasswordSchema>({
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	})

	const { showToast } = useToastService()
	const { requestNewPassword, isLoading } = useAuthRequestNewPassword({
		onSuccess: () =>
			resetSuccess({
				title: `Enviamos as instruções para seu  ${'\n'}e-mail`,
				description:
					'Clique no link enviado no seu e-mail para recuperar sua senha',
				icon: {
					name: 'messageRound',
					color: 'primary',
				},
			}),
		onError: (message) => showToast({ message, type: 'error' }),
	})

	const retrievePassword = useCallback(
		(formValues: ForgotPasswordSchema) => {
			requestNewPassword(formValues.email)
		},
		[requestNewPassword]
	)

	return (
		<ScreenTemplate canGoBack>
			<Text preset="headingLarge" mb="s16">
				Esqueci minha senha
			</Text>
			<Text preset="paragraphLarge" mb="s32">
				Digite seu e-mail e enviaremos as instruções para redefinição de senha
			</Text>
			<ControlledFormInput.Email
				control={control}
				name="email"
				returnKeyType="done"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onSubmitEditing={handleSubmit(retrievePassword)}
			/>
			<Button
				loading={isLoading}
				disabled={!isValid}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onPress={handleSubmit(retrievePassword)}
				title="Recuperar senha"
			/>
		</ScreenTemplate>
	)
}
