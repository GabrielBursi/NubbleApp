import { PropsWithChildren } from 'react'

import { AuthCredentialsProvider } from '@/services/auth'
import { ToastProvider } from '@/services/toast'

//? Only use ToastProvider if it is using Context implementation. Zustand implementation doesn't need a provider
//? Only use AuthCredentialsProvider if it is using Context implementation. Zustand implementation doesn't need a provider

export const ContextProvider = ({ children }: Readonly<PropsWithChildren>) => {
	return (
		<AuthCredentialsProvider>
			<ToastProvider>{children}</ToastProvider>
		</AuthCredentialsProvider>
	)
}
