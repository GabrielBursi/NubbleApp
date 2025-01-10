import { Login } from './Login'
import { Logout } from './Logout'
import { SignUp } from './SignUp'

export const AuthApi = {
	SignUp,
	Login,
	Logout,
} as const
