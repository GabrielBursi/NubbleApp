import { RootAppTabBottomRouterParamList } from './AppTabBottom'

export type RootAppStackRouterParamList = {
	AppTabNavigator: RootAppTabBottomRouterParamList
	SettingsScreen: undefined
	SearchScreen: undefined
	PostCommentScreen: {
		postId: string
		postAuthorId: string
	}
	ProfileScreen: {
		userId: number
	}
}
