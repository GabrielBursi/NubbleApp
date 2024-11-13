import { IconProps } from '@/components/ui/Icon/Icon.types'

export type RootStackParamList = {
	LoginScreen: undefined
	SignUpScreen: undefined
	SuccessScreen: {
		title: string
		description: string
		icon: Pick<IconProps, 'name' | 'color'>
	}
	ForgotPasswordScreen: undefined
}
