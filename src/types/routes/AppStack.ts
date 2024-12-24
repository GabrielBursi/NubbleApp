import { RootAppTabBottomRouterParamList } from './AppTabBottom'

export type RootAppStackRouterParamList = {
	AppTabNavigator: RootAppTabBottomRouterParamList
	SettingsScreen: undefined
	PostCommentScreen: {
		postId: string
		postAuthorId: string
	}
}
