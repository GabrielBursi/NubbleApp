import React, { useCallback, useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { Box, Button, ControlledFormInput } from '@/components'
import { useAuthUpdatePassword } from '@/domain/Auth'
import { ScreenTemplate } from '@/templates'
import { EditPasswordSchema, editPasswordSchema } from '@/types/form'

export const EditPasswordScreen = () => {
	const { isLoading, updatePassword } = useAuthUpdatePassword()

	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<EditPasswordSchema>({
		resolver: zodResolver(editPasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmedPassword: '',
		},
		mode: 'onChange',
	})

	const currentPasswordRef = useRef<RNTextInput>(null)
	const newPasswordRef = useRef<RNTextInput>(null)
	const confirmedPasswordRef = useRef<RNTextInput>(null)

	const handleUpdatePassword = useCallback(
		({ newPassword, currentPassword }: EditPasswordSchema) =>
			updatePassword({ currentPassword, newPassword }),
		[updatePassword]
	)

	// TODO:REFACTOR
	const handleSubmitErrors: SubmitErrorHandler<EditPasswordSchema> =
		useCallback((fieldErrors) => {
			const fields = [
				{ ref: currentPasswordRef, error: fieldErrors.currentPassword },
				{ ref: newPasswordRef, error: fieldErrors.newPassword },
				{ ref: confirmedPasswordRef, error: fieldErrors.confirmedPassword },
			]

			const firstErrorField = fields.find((field) => !!field.error)
			firstErrorField?.ref.current?.focus()
		}, [])

	// TODO:REFACTOR
	const handleSubmitEditingCurrentPasswordInput = useCallback(() => {
		newPasswordRef.current?.focus()
	}, [])

	const handleSubmitEditingNewPasswordInput = useCallback(() => {
		confirmedPasswordRef.current?.focus()
	}, [])

	return (
		<ScreenTemplate canGoBack scrollable title="Alterar Senha">
			<Box gap="s32">
				<Box>
					<ControlledFormInput.Password
						control={control}
						name="currentPassword"
						returnKeyType="next"
						onSubmitEditing={handleSubmitEditingCurrentPasswordInput}
						ref={currentPasswordRef}
						label="Senha Atual"
						placeholder="Digite sua senha atual"
					/>
					<ControlledFormInput.Password
						control={control}
						name="newPassword"
						returnKeyType="next"
						onSubmitEditing={handleSubmitEditingNewPasswordInput}
						ref={newPasswordRef}
						label="Nova Senha"
						placeholder="Digite a nova senha"
					/>
					<ControlledFormInput.Password
						control={control}
						name="confirmedPassword"
						returnKeyType="done"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
						onSubmitEditing={handleSubmit(
							handleUpdatePassword,
							handleSubmitErrors
						)}
						ref={confirmedPasswordRef}
						label="Confirmar Senha"
						placeholder="Confirme sua senha"
					/>
				</Box>
				<Button
					title="Salvar alterações"
					disabled={!isValid}
					loading={isLoading}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
					onPress={handleSubmit(handleUpdatePassword, handleSubmitErrors)}
				/>
			</Box>
		</ScreenTemplate>
	)
}
