export type ProfileButtonProps = {
	/** @default false */
	isMyProfile?: boolean
	/** @default false */
	isFollowing?: boolean
	userId: number
}

export type ProfileButtonVariants =
	| 'myProfile'
	| 'isFollowing'
	| 'isNotFollowing'
