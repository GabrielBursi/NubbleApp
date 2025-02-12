import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppState = (): Readonly<AppStateStatus> => {
	const [appState, setAppState] = useState(AppState.currentState)

	useEffect(() => {
		const eventSubscription = AppState.addEventListener('change', (state) => {
			setAppState(state)
		})

		return () => eventSubscription.remove()
	}, [])

	return appState
}
