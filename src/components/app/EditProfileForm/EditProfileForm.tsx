import React, {
	forwardRef,
	RefObject,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitErrorHandler, useForm } from 'react-hook-form'

import { Box, ControlledFormInput } from '@/components'
import { useAuthValueIsAvailable } from '@/domain/Auth'
import { AppQueryKeys } from '@/types/api'
import { editProfileSchema, EditProfileSchema } from '@/types/form'

import {
	EditProfileFormProps,
	EditProfileFormRef,
} from './EditProfileForm.types'

export const EditProfileForm = forwardRef<
	EditProfileFormRef,
	Readonly<EditProfileFormProps>
>(({ user = null, onChangeIsValid }, ref) => {
	const {
		control,
		watch,
		getFieldState,
		handleSubmit,
		setValue,
		formState: { isValid, dirtyFields },
	} = useForm<EditProfileSchema>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			username: user?.username ?? '',
			firstName: user?.firstName ?? '',
			lastName: user?.lastName ?? '',
		},
		mode: 'onChange',
		shouldUnregister: true,
	})

	const userNameRef = useRef<RNTextInput>(null)
	const nameRef = useRef<RNTextInput>(null)
	const lastNameRef = useRef<RNTextInput>(null)

	const userNameValue = watch('username')
	const userNameState = getFieldState('username')

	const usernameVerificationEnabled = useMemo(
		() =>
			!userNameState.invalid &&
			!!user &&
			userNameValue !== user.username &&
			!!dirtyFields.username,
		[dirtyFields.username, user, userNameState.invalid, userNameValue]
	)

	// TODO: REFACTOR
	const {
		isUnavailable: userNameIsUnavailable,
		isFetching: userNameIsFetching,
	} = useAuthValueIsAvailable({
		queryKey: AppQueryKeys.USERNAME_AVAILABLE,
		value: userNameValue,
		enabled: usernameVerificationEnabled,
	})

	const onSubmit = useCallback(console.log, [])

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

	const handleSubmitErrors: SubmitErrorHandler<EditProfileSchema> = useCallback(
		(fieldErrors) => {
			const fields = [
				{ ref: userNameRef, error: fieldErrors.username },
				{ ref: nameRef, error: fieldErrors.firstName },
				{ ref: lastNameRef, error: fieldErrors.lastName },
			]

			const firstErrorField = fields.find((field) => !!field.error)
			firstErrorField?.ref.current?.focus()
		},
		[]
	)

	useImperativeHandle(ref, () => ({
		onSubmit: handleSubmit(onSubmit, handleSubmitErrors),
	}))

	useEffect(() => {
		const isUsernameValid =
			(!!user && userNameValue === user.username) ||
			(!userNameIsFetching && !userNameIsUnavailable)

		onChangeIsValid?.(isValid && isUsernameValid)
	}, [
		isValid,
		onChangeIsValid,
		userNameIsFetching,
		userNameIsUnavailable,
		user,
		userNameValue,
	])

	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName)
			setValue('lastName', user.lastName)
			setValue('username', user.username)
		}
	}, [setValue, user])

	return (
		<Box role="form" gap="s16" accessible>
			<ControlledFormInput.Username
				boxProps={{ mb: undefined }}
				name="username"
				control={control}
				ref={userNameRef}
				returnKeyType="next"
				onSubmitEditing={handleNameFocusSubmitEditing}
				disabled={!user}
				errorMessage={
					userNameIsUnavailable && usernameVerificationEnabled
						? 'Usuário não está indisponível'
						: undefined
				}
				loading={userNameIsFetching && usernameVerificationEnabled}
			/>
			<ControlledFormInput.Name
				boxProps={{ mb: undefined }}
				name="firstName"
				control={control}
				ref={nameRef}
				label="Nome"
				placeholder="Digite seu nome"
				returnKeyType="next"
				onSubmitEditing={handleLastNameFocusSubmitEditing}
				disabled={!user}
			/>
			<ControlledFormInput.Name
				boxProps={{ mb: undefined }}
				name="lastName"
				control={control}
				ref={lastNameRef}
				label="Sobrenome"
				placeholder="Digite seu sobrenome"
				returnKeyType="done"
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onSubmitEditing={handleSubmit(onSubmit, handleSubmitErrors)}
				disabled={!user}
			/>
		</Box>
	)
})
