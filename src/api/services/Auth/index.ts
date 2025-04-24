import { ForgotPassword } from './ForgotPassword'
import { RefreshToken } from './RefreshToken'
import { SignIn } from './SignIn'
import { SignOut } from './SignOut'
import { SignUp } from './SignUp'
import { UpdatePassword } from './UpdatePassword'
import { VerifyEmail } from './VerifyEmail'
import { VerifyUsername } from './VerifyUsername'

export const AuthServices = {
	ForgotPassword,
	RefreshToken,
	SignIn,
	SignOut,
	SignUp,
	UpdatePassword,
	VerifyEmail,
	VerifyUsername,
} as const
