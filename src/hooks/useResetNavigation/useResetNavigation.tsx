import { useCallback } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '@/types/routes'

export const useResetNavigation = () => {
	const { reset } = useNavigation<NavigationProp<RootStackParamList>>()

	const resetSuccess = useCallback(
		(params: RootStackParamList['SuccessScreen']) => {
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
