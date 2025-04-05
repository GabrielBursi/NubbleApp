import { UserDetailsModel } from '@/domain/User'

export type ProfileHeaderProps = {
	user: UserDetailsModel
	/** @default false */
	isMyProfile?: boolean
	/** @default 0 */
	postsCount?: number
}
