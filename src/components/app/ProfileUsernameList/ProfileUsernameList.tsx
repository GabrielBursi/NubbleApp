import React, { memo } from 'react'

import { useScrollToTop } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import { Box, Icon, ProfileUsername } from '@/components'
import { UserModel } from '@/domain/User'
import { useSearchHistoryService } from '@/services/searchHistory'

import { ProfileUsernameListProps } from './ProfileUsernameList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

const ProfileUsernameListMemoized = ({
	users = [],
	ListHeaderComponent,
	onPressProfileItem,
}: Readonly<ProfileUsernameListProps>) => {
	const flatListRef = React.useRef<FlashList<UserModel>>(null)
	//TODO: atualizar react navigation https://github.com/react-navigation/react-navigation/commit/a1f947a44f16a8d846c31d76efb0485780bd8de3
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	useScrollToTop(flatListRef as any)

	const { removeUser } = useSearchHistoryService()

	return (
		<FlashList
			ref={flatListRef}
			showsVerticalScrollIndicator={false}
			data={users}
			keyExtractor={(user, index) => `${user.id}-${index}`}
			renderItem={({ item: user }) => (
				<ProfileUsername
					{...user}
					avatarProps={{ size: 48 }}
					onPress={() => onPressProfileItem?.(user)}
					RightComponent={
						<Icon
							color="redError"
							name="trash"
							onPress={() => removeUser(user.id)}
						/>
					}
				/>
			)}
			ItemSeparatorComponent={ItemSeparatorComponent}
			ListHeaderComponent={ListHeaderComponent}
			disableAutoLayout
			// size ProfileUsername device: Medium Phone API 34
			estimatedItemSize={364 * 64}
			// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
			accessible
			accessibilityLabel="feed"
			aria-label="feed"
			role="list"
			accessibilityRole="list"
			keyboardShouldPersistTaps="handled"
		/>
	)
}

export const ProfileUsernameList = memo(ProfileUsernameListMemoized)
