import { UserModel } from '@/domain/User'

export type ProfileProps = {
	userId: UserModel['id']
	/** @default false */
	isMyProfile?: boolean
}
