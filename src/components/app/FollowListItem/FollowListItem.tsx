import React, { memo } from 'react'

import { Button, ProfileUsername } from '@/components'
import { useFollowUser } from '@/domain/Follow'
import { useToastService } from '@/services/toast'

import { FollowListItemProps } from './FollowListItem.types'

const FollowListItemMemoized = ({
	buttonTitle,
	user,
	toastMessage,
	canUndoRemoveFollow = false,
}: Readonly<FollowListItemProps>) => {
	const { showToast } = useToastService()
	const { removeFollowing, undoRemoveFollow } = useFollowUser(user.id, {
		removeFollowingOptions: {
			onSuccess: () => {
				showToast({
					message: toastMessage,
					type: 'success',
					position: 'bottom',
					action: canUndoRemoveFollow
						? {
								title: 'Desfazer',
								onPress: undoRemoveFollow,
							}
						: undefined,
				})
			},
		},
	})

	return (
		<ProfileUsername
			{...user}
			RightComponent={
				<Button
					title={buttonTitle}
					preset="gray"
					onPress={() => removeFollowing(user.followId)}
				/>
			}
		/>
	)
}

export const FollowListItem = memo(FollowListItemMemoized)
