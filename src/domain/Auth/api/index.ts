import { IsEmailAvailable } from './IsEmailAvailable'
import { IsUserNameAvailable } from './IsUserNameAvailable'
import { Login } from './Login'
import { Logout } from './Logout'
import { SignUp } from './SignUp'

export const AuthApi = {
	IsEmailAvailable,
	IsUserNameAvailable,
	SignUp,
	Login,
	Logout,
} as const
