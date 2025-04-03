import { useCallback, useMemo } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'

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
		useNavigation<NavigationProp<RootAppStackRouterParamList>>()

	const navigationAppTab =
		useNavigation<NavigationProp<RootAppTabBottomRouterParamList>>()

	const navigationAuthStack =
		useNavigation<NavigationProp<RootAuthStackRouterParamList>>()

	const navigateToProfile = useCallback(
		(userId: UserModel['id']) => {
			if (authCredentials?.user.id === userId) {
				navigationAppTab.navigate('MyProfileScreen')
			} else {
				navigationAppStack.navigate('ProfileScreen', { userId })
			}
		},
		[authCredentials?.user.id, navigationAppStack, navigationAppTab]
	)

	const navigateToPostComments = useCallback(
		(params: PostCommentsScreenParams) =>
			navigationAppStack.navigate('PostCommentScreen', {
				...params,
				showPost: false,
			}),
		[navigationAppStack]
	)

	const navigateToPostDetails = useCallback(
		(params: PostCommentsScreenParams) =>
			navigationAppStack.navigate('PostCommentScreen', {
				...params,
				showPost: true,
			}),
		[navigationAppStack]
	)

	const navigate = useMemo(
		() =>
			({
				toProfile: navigateToProfile,
				toComments: navigateToPostComments,
				toPostDetails: navigateToPostDetails,
			}) as const,
		[navigateToPostComments, navigateToPostDetails, navigateToProfile]
	)

	return {
		navigationAppStack,
		navigationAuthStack,
		navigationAppTab,
		navigate,
	} as const
}
