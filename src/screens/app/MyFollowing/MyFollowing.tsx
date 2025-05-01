import { Button, InfinityScrollList, ProfileUsername } from '@/components'
import { FollowApi } from '@/domain/Follow'
import { ScreenTemplate } from '@/templates'
import { AppQueryKeys } from '@/types/api'

export const MyFollowingScreen = () => {
	return (
		<ScreenTemplate title="Seguindo" canGoBack>
			<InfinityScrollList
				getList={FollowApi.GetMyFollowingList}
				queryOpt={{
					queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
				}}
				accessibilityLabel="seguindo"
				estimatedItemSize={80}
				keyExtractor={({ id }, index) => `${id}-${index}`}
				errorMessage="Ocorreu um erro ao listar os usuários"
				emptyMessage="Você ainda não está seguindo ninguém"
				renderItem={({ item: user }) => (
					<ProfileUsername
						{...user}
						RightComponent={<Button title="Seguindo" preset="gray" />}
					/>
				)}
			/>
		</ScreenTemplate>
	)
}
