import { useCallback, useMemo } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { UserModel } from '@/domain/User'
import { useAuthCredentials } from '@/services/auth'
import {
	RootAppStackRouterParamList,
	RootAppTabBottomRouterParamList,
	RootAuthStackRouterParamList,
} from '@/types/routes'

type PostCommentsScreenParams = Omit<
	RootAppStackRouterParamList['PostCommentScreen'],
	'showPost'
>

export const useAppNavigation = () => {
	const authCredentials = useAuthCredentials()

	const navigationAppStack =
		useNavigation<NativeStackNavigationProp<RootAppStackRouterParamList>>()

	const navigationAppTab =
		useNavigation<NavigationProp<RootAppTabBottomRouterParamList>>()

	const navigationAuthStack =
		useNavigation<NativeStackNavigationProp<RootAuthStackRouterParamList>>()

	const navigateToProfile = useCallback(
		(userId: UserModel['id']) => {
			if (authCredentials?.user.id === userId) {
				navigationAppTab.navigate('MyProfileScreen')
			} else {
				navigationAppStack.push('ProfileScreen', { userId })
			}
		},
		[authCredentials?.user.id, navigationAppStack, navigationAppTab]
	)

	const navigateToPostComments = useCallback(
		(params: PostCommentsScreenParams) =>
			navigationAppStack.push('PostCommentScreen', {
				...params,
				showPost: false,
			}),
		[navigationAppStack]
	)

	const navigateToPostDetails = useCallback(
		(params: PostCommentsScreenParams) =>
			navigationAppStack.push('PostCommentScreen', {
				...params,
				showPost: true,
			}),
		[navigationAppStack]
	)

	const navigateToEditProfile = useCallback(
		() => navigationAppStack.navigate('EditProfileScreen'),
		[navigationAppStack]
	)

	const navigate = useMemo(
		() =>
			({
				toProfile: navigateToProfile,
				toComments: navigateToPostComments,
				toPostDetails: navigateToPostDetails,
				toEditProfile: navigateToEditProfile,
			}) as const,
		[
			navigateToEditProfile,
			navigateToPostComments,
			navigateToPostDetails,
			navigateToProfile,
		]
	)

	return {
		navigationAppStack,
		navigationAuthStack,
		navigationAppTab,
		navigate,
	} as const
}
