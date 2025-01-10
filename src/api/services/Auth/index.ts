import { SignIn } from './SignIn'
import { SignOut } from './SignOut'
import { SignUp } from './SignUp'
import { VerifyEmail } from './VerifyEmail'
import { VerifyUsername } from './VerifyUsername'

export const AuthServices = {
	SignIn,
	SignOut,
	SignUp,
	VerifyEmail,
	VerifyUsername,
} as const
