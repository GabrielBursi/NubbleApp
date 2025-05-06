import { FollowList } from '@/components'
import { ScreenTemplate } from '@/templates'

export const MyFollowingScreen = () => {
	return (
		<ScreenTemplate title="Seguindo" canGoBack>
			<FollowList type="following" />
		</ScreenTemplate>
	)
}
