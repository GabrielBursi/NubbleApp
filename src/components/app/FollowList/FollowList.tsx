import React, { memo, useMemo } from 'react'

import { FollowListItem, InfinityScrollList } from '@/components'
import { FollowApi } from '@/domain/Follow'
import { AppQueryKeys } from '@/types/api'

import { ConfigPropsTypeFollowList, FollowListProps } from './FollowList.types'

const config: ConfigPropsTypeFollowList = {
	followers: {
		getList: FollowApi.GetMyFollowersList,
		queryOpt: { queryKey: [AppQueryKeys.MY_FOLLOWERS_LIST] },
		accessibilityLabel: 'seguidores',
		errorMessage: 'Ocorreu um erro ao listar os seguidores',
		emptyMessage: 'Você ainda não possui seguidores',
		buttonTitle: 'Remover',
		canUndoAction: false,
		toastMessage: 'Seguidor removido',
	},
	following: {
		getList: FollowApi.GetMyFollowingList,
		queryOpt: { queryKey: [AppQueryKeys.MY_FOLLOWING_LIST] },
		accessibilityLabel: 'seguindo',
		errorMessage: 'Ocorreu um erro ao listar os usuários seguidos',
		emptyMessage: 'Você ainda não está seguindo ninguém',
		buttonTitle: 'Seguindo',
		canUndoAction: true,
		toastMessage: 'Deixou de seguir',
	},
}

const FollowListMemoized = ({ type, ...props }: Readonly<FollowListProps>) => {
	const variantTypeProps = useMemo(() => config[type], [type])

	return (
		<InfinityScrollList
			{...props}
			getList={variantTypeProps.getList}
			queryOpt={variantTypeProps.queryOpt}
			accessibilityLabel={variantTypeProps.accessibilityLabel}
			estimatedItemSize={80}
			keyExtractor={({ id }, index) => `${id}-${index}`}
			errorMessage={variantTypeProps.errorMessage}
			emptyMessage={variantTypeProps.emptyMessage}
			renderItem={({ item: user }) => (
				<FollowListItem
					user={user}
					buttonTitle={variantTypeProps.buttonTitle}
					canUndoRemoveFollow={variantTypeProps.canUndoAction}
					toastMessage={variantTypeProps.toastMessage}
				/>
			)}
		/>
	)
}

export const FollowList = memo(FollowListMemoized)
