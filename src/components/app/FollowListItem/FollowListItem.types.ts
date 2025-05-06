import { FollowUserModel } from '@/domain/Follow'

export type FollowListItemProps = {
	user: FollowUserModel
	buttonTitle: string
	toastMessage: string
	/** @default false */
	canUndoRemoveFollow?: boolean
}
