import React, { useCallback, useRef, useState } from 'react'

import { Box, Button, EditProfileForm, EditProfileHeader } from '@/components'
import { EditProfileFormRef } from '@/components/app/EditProfileForm/EditProfileForm.types'
import { useUserGetById } from '@/domain/User'
import { ScreenTemplate } from '@/templates'
import { EditProfileScreenProps } from '@/types/screens'

export const EditProfileScreen = ({
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
			</Box>
			<Button
				title="Salvar alterações"
				mt="s40"
				onPress={submitForm}
				disabled={!formIsValid}
			/>
		</ScreenTemplate>
	)
}
