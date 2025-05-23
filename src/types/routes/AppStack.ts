import { RootAppTabBottomRouterParamList } from './AppTabBottom'

export type RootAppStackRouterParamList = {
	AppTabNavigator: RootAppTabBottomRouterParamList
	SettingsScreen: undefined
	SearchScreen: undefined
	PostCommentScreen: {
		postId: string
		postAuthorId: string
		/** @default false */
		showPost?: boolean
	}
	ProfileScreen: {
		userId: number
	}
	PublishPostScreen: {
		imageUri: string
	}
	CameraScreen: undefined
	ThemeScreen: undefined
	EditProfileScreen: { userId: number }
	EditEmailScreen: { userId: number }
	EditPasswordScreen: { userId: number }
	MyFollowingScreen: undefined
	MyFollowersScreen: undefined
}
