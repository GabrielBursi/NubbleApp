import { useCallback } from 'react'

import { useAppNavigation } from '@/hooks'
import { RootAuthStackRouterParamList } from '@/types/routes'

export const useResetNavigation = () => {
	const { navigationAuthStack } = useAppNavigation()

	const resetSuccess = useCallback(
		(params: RootAuthStackRouterParamList['SuccessScreen']) => {
			navigationAuthStack.reset({
				index: 1,
				routes: [
					{
						name: 'LoginScreen',
					},
					{
						name: 'SuccessScreen',
						params,
					},
				],
			})
		},
		[navigationAuthStack]
	)

	return {
		resetSuccess,
	} as const
}
