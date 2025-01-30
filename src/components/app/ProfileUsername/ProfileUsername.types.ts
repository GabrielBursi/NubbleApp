import { UserModel } from '@/domain/User'

export type ProfileUsernameProps = Pick<UserModel, 'username' | 'profileUrl'>
