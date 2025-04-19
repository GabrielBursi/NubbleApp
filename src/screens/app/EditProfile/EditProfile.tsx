import React, { useCallback, useRef, useState } from 'react'

import { Box, Button, EditProfileForm, EditProfileHeader } from '@/components'
import { EditProfileFormRef } from '@/components/app/EditProfileForm/EditProfileForm.types'
import { useUserGetById } from '@/domain/User'
import { ScreenTemplate } from '@/templates'
import { EditProfileScreenProps } from '@/types/screens'

export const EditProfileScreen = ({
	navigation,
	route: {
		params: { userId },
	},
}: EditProfileScreenProps) => {
	const { user } = useUserGetById(userId)

	const [formIsValid, setFormIsValid] = useState(false)
	const formRef = useRef<EditProfileFormRef>(null)

	const submitForm = useCallback(() => {
		formRef.current?.onSubmit()
	}, [])

	return (
		<ScreenTemplate canGoBack scrollable title="Editar Perfil">
			<Box gap="s10">
				<EditProfileHeader user={user} />
				<EditProfileForm
					ref={formRef}
					onChangeIsValid={setFormIsValid}
					user={user}
				/>
				<Box gap="s10" mt="s20">
					<Button.Input
						label="Email"
						value={user?.email ?? ''}
						mb="s16"
						onPress={() =>
							navigation.navigate('EditEmailScreen', {
								userId: userId,
							})
						}
					/>
					<Button.Input
						label="Senha"
						value="•••••••"
						onPress={() =>
							navigation.navigate('EditPasswordScreen', {
								userId: userId,
							})
						}
					/>
				</Box>
				<Button
					title="Salvar alterações"
					mt="s20"
					onPress={submitForm}
					disabled={!formIsValid}
				/>
			</Box>
		</ScreenTemplate>
	)
}
