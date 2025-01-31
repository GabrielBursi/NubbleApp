import { FlashListProps } from '@shopify/flash-list'

import { UserModel } from '@/domain/User'

export type ProfileUsernameListProps = {
	/** @default [] */
	users?: UserModel[]
} & Pick<FlashListProps<UserModel>, 'ListHeaderComponent'>
