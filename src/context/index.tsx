import { PropsWithChildren } from 'react'

import { ToastProvider } from '@/services/toast'

//? Only use ToastProvider if it is using Context implementation. Zustand implementation doesn't need a provider

export const ContextProvider = ({ children }: Readonly<PropsWithChildren>) => {
	return <ToastProvider>{children}</ToastProvider>
}
