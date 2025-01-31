import { PressableBoxProps } from '@/components/ui/PressableBox/PressableBox.types'
import { UserModel } from '@/domain/User'
import { StrictOmit } from '@/types/utils'

import { ProfileAvatarProps } from '../ProfileAvatar/ProfileAvatar.types'

export type ProfileUsernameProps = Pick<
	UserModel,
	'username' | 'profileUrl' | 'id'
> &
	StrictOmit<PressableBoxProps, 'id'> & {
		avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageURL'>
		RightComponent?: React.ReactElement
	}
