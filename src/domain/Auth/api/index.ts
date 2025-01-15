import { IsEmailAvailable } from './IsEmailAvailable'
import { IsUserNameAvailable } from './IsUserNameAvailable'
import { Login } from './Login'
import { Logout } from './Logout'
import { AuthenticateByRefreshToken } from './RefreshToken'
import { RequestNewPassword } from './RequestNewPassword'
import { SignUp } from './SignUp'

export const AuthApi = {
	IsEmailAvailable,
	IsUserNameAvailable,
	SignUp,
	Login,
	Logout,
	AuthenticateByRefreshToken,
	RequestNewPassword,
} as const
