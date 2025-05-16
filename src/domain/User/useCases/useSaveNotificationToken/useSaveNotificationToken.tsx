import { useCallback, useEffect } from 'react'

import { useMutation } from '@tanstack/react-query'

import { useNotificationService } from '@/services/notification'

import { UserApi } from '../../api'

export const useSaveNotificationToken = () => {
	const notificationService = useNotificationService()

	const { data, mutate, isPending, isSuccess } = useMutation({
		mutationFn: UserApi.SaveNotificationToken,
		retry: false,
		gcTime: 5 * 1000 * 60,
	})

	const saveNotificationToken = useCallback(async () => {
		try {
			const token = await notificationService.getToken()
			mutate(token)
		} catch (error) {
			console.log({ error })
		}
	}, [mutate, notificationService])

	useEffect(() => {
		saveNotificationToken().catch(console.log)
	}, [saveNotificationToken])

	return {
		isLoading: isPending,
		saveNotificationToken,
		isSuccess,
		token: data ?? null,
	} as const
}
