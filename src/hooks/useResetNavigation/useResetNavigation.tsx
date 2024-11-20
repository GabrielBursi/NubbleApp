import { useCallback } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { RootAuthStackRouterParamList } from '@/types/routes'

export const useResetNavigation = () => {
	const { reset } =
		useNavigation<NavigationProp<RootAuthStackRouterParamList>>()

	const resetSuccess = useCallback(
		(params: RootAuthStackRouterParamList['SuccessScreen']) => {
			reset({
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
		[reset]
	)

	return {
		resetSuccess,
	} as const
}
