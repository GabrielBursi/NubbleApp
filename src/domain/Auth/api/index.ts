import { IsEmailAvailable } from './IsEmailAvailable'
import { IsUserNameAvailable } from './IsUserNameAvailable'
import { Login } from './Login'
import { Logout } from './Logout'
import { RequestNewPassword } from './RequestNewPassord'
import { SignUp } from './SignUp'

export const AuthApi = {
	IsEmailAvailable,
	IsUserNameAvailable,
	SignUp,
	Login,
	Logout,
	RequestNewPassword,
} as const
