import { useCallback, useEffect } from 'react'

import messaging from '@react-native-firebase/messaging'
import { useMutation } from '@tanstack/react-query'

import { UserApi } from '../../api'

export const useSaveNotificationToken = () => {
	const { data, mutate, isPending, isSuccess } = useMutation({
		mutationFn: UserApi.SaveNotificationToken,
		retry: false,
		gcTime: 5 * 1000 * 60,
	})

	const saveNotificationToken = useCallback(async () => {
		try {
			const token = await messaging().getToken() //TODO: move to a service
			mutate(token)
		} catch (error) {
			console.log({ error })
		}
	}, [mutate])

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
