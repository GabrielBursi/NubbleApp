import { UserModel } from '@/domain/User'

export type ProfileHeaderProps = {
	user: UserModel
	/** @default false */
	isMyProfile?: boolean
}
