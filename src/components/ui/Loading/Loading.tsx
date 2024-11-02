import React from 'react'
import { ActivityIndicator } from 'react-native'

import { useAppTheme } from '@/hooks'

import { LoadingProps } from './Loading.types'

export const Loading = ({ color, ...props }: Readonly<LoadingProps>) => {
	const { colors } = useAppTheme()

	return <ActivityIndicator {...props} color={colors[color]} />
}
