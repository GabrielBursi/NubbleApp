import { useCallback, useRef } from 'react'

import { useFocusEffect } from '@react-navigation/native'

export const useRefreshOnFocus = <TData = unknown,>(
	refetch: () => Promise<TData>
) => {
	const firstTimeRef = useRef(true)

	useFocusEffect(
		useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false
				return
			}

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			refetch()
		}, [refetch])
	)
}
