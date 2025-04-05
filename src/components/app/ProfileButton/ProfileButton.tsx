import React, { memo, useCallback } from 'react'

import { Button } from '@/components'
import { ButtonProps } from '@/components/ui/Button/Button.types'
import { useAppNavigation } from '@/hooks'

import {
	ProfileButtonProps,
	ProfileButtonVariants,
} from './ProfileButton.types'

const buttonVariants: Record<
	ProfileButtonVariants,
	Pick<ButtonProps, 'title' | 'preset'>
> = {
	myProfile: {
		title: 'Editar perfil',
		preset: 'gray',
	},
	isFollowing: {
		title: 'Mensagem',
		preset: 'primary',
	},
	isNotFollowing: {
		title: 'Seguir',
		preset: 'outline',
	},
}

const getVariant = ({
	isFollowing,
	isMyProfile,
}: ProfileButtonProps): ProfileButtonVariants => {
	if (isMyProfile) return 'myProfile'

	if (isFollowing) return 'isFollowing'

	return 'isNotFollowing'
}

const ProfileButtonMemoized = ({
	isFollowing = false,
	isMyProfile = false,
}: Readonly<ProfileButtonProps>) => {
	const { navigate } = useAppNavigation()

	const variant = getVariant({ isFollowing, isMyProfile })
	const buttonProps = buttonVariants[variant]

	const handleOnPress = useCallback(() => {
		if (isMyProfile) navigate.toEditProfile()
	}, [isMyProfile, navigate])

	return (
		<Button marginVertical="s24" onPress={handleOnPress} {...buttonProps} />
	)
}

export const ProfileButton = memo(ProfileButtonMemoized)
