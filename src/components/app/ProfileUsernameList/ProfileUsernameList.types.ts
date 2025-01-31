import { UserModel } from '@/domain/User'

export type ProfileUsernameListProps = {
	/** @default [] */
	users?: UserModel[]
	onPressProfileItem?: (user: UserModel) => void
	onRemoveProfileItem?: (user: UserModel) => void
	headerTitle?: string
}
