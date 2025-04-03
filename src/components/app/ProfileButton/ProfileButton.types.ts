export type ProfileButtonProps = {
	/** @default false */
	isMyProfile?: boolean
	/** @default false */
	isFollowing?: boolean
}

export type ProfileButtonVariants =
	| 'myProfile'
	| 'isFollowing'
	| 'isNotFollowing'
