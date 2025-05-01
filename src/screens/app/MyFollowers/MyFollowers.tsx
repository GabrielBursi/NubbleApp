import React from 'react'

import { Button, InfinityScrollList, ProfileUsername } from '@/components'
import { FollowApi } from '@/domain/Follow'
import { ScreenTemplate } from '@/templates'
import { AppQueryKeys } from '@/types/api'

export const MyFollowersScreen = () => {
	return (
		<ScreenTemplate title="Seguidores" canGoBack>
			<InfinityScrollList
				getList={FollowApi.GetMyFollowersList}
				queryOpt={{
					queryKey: [AppQueryKeys.MY_FOLLOWERS_LIST],
				}}
				accessibilityLabel="seguidores"
				estimatedItemSize={80}
				keyExtractor={({ id }, index) => `${id}-${index}`}
				errorMessage="Ocorreu um erro ao listar os usuários"
				emptyMessage="Você ainda não possui seguidores"
				renderItem={({ item: user }) => (
					<ProfileUsername
						{...user}
						RightComponent={<Button title="Remover" preset="gray" />}
					/>
				)}
			/>
		</ScreenTemplate>
	)
}
