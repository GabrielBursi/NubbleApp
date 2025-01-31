import { PressableBoxProps } from '@/components/ui/PressableBox/PressableBox.types'
import { UserModel } from '@/domain/User'
import { StrictOmit } from '@/types/utils'

export type ProfileUsernameProps = Pick<
	UserModel,
	'username' | 'profileUrl' | 'id'
> &
	StrictOmit<PressableBoxProps, 'id'>
