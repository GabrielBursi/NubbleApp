import { FlashListProps } from '@shopify/flash-list'

import { UserModel } from '@/domain/User'

export type ProfileUsernameListProps = {
	/** @default [] */
	users?: UserModel[]
	onPressProfileItem?: (user: UserModel) => void
} & Pick<FlashListProps<UserModel>, 'ListHeaderComponent'>
