import { PropsWithChildren } from 'react'

//? import assim para teste não se perder
import { AuthCredentialsProvider } from '@/services/auth/store/context'
import { ToastProvider } from '@/services/toast/store/context'

//? Only use ToastProvider if it is using Context implementation. Zustand implementation doesn't need a provider
//? Only use AuthCredentialsProvider if it is using Context implementation. Zustand implementation doesn't need a provider

export const ContextProvider = ({ children }: Readonly<PropsWithChildren>) => {
	return (
		<AuthCredentialsProvider>
			<ToastProvider>{children}</ToastProvider>
		</AuthCredentialsProvider>
	)
}
