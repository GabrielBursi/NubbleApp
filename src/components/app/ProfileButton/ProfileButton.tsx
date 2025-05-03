import React, { memo, useCallback } from 'react'

import { Button } from '@/components'
import { ButtonProps } from '@/components/ui/Button/Button.types'
import { useFollowUser } from '@/domain/Follow'
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
}: Pick<
	ProfileButtonProps,
	'isFollowing' | 'isMyProfile'
>): ProfileButtonVariants => {
	if (isMyProfile) return 'myProfile'

	if (isFollowing) return 'isFollowing'

	return 'isNotFollowing'
}

const ProfileButtonMemoized = ({
	isFollowing = false,
	isMyProfile = false,
	userId,
}: Readonly<ProfileButtonProps>) => {
	const { navigate } = useAppNavigation()
	const { followUser, isPendingFollowUser } = useFollowUser(userId)

	const variant = getVariant({ isFollowing, isMyProfile })
	const buttonProps = buttonVariants[variant]

	const handleOnPress = useCallback(() => {
		if (isPendingFollowUser) return
		if (isMyProfile) navigate.toEditProfile(userId)
		if (!isFollowing) followUser()
	}, [
		followUser,
		isFollowing,
		isPendingFollowUser,
		isMyProfile,
		navigate,
		userId,
	])

	return (
		<Button marginVertical="s24" onPress={handleOnPress} {...buttonProps} />
	)
}

export const ProfileButton = memo(ProfileButtonMemoized)
