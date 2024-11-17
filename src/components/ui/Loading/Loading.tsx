import React from 'react'
import { ActivityIndicator } from 'react-native'

import { LoadingProps } from './Loading.types'

import { useAppTheme } from '@/hooks'

export const Loading = ({ color, ...props }: Readonly<LoadingProps>) => {
	const { colors } = useAppTheme()

	return <ActivityIndicator {...props} color={colors[color]} />
}
