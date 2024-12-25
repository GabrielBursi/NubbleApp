/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Dimensions } from 'react-native'

import { Box, Icon, Text } from '@/components'
import { IconProps } from '@/components/ui/Icon/Icon.types'
import { useAppTheme } from '@/hooks'
import { ToastPosition, ToastType } from '@/services/toast'

import { ToastContentProps } from './ToastContent.types'

export const ToastContent = (toast: Readonly<ToastContentProps>) => {
	const { colors } = useAppTheme()
	const position: ToastPosition = toast?.position ?? 'top'
	const type: ToastType = toast?.type ?? 'success'

	return (
		<Box
			top={100}
			position="absolute"
			backgroundColor="background"
			alignSelf="center"
			alignItems="center"
			padding="s16"
			borderRadius="s16"
			flexDirection="row"
			opacity={0.95}
			maxWidth={Dimensions.get('screen').width * 0.9}
			style={[
				{ [position]: 100 },
				{
					elevation: 10,
					shadowColor: colors.primaryShadow,
					shadowOpacity: 0.05,
					shadowRadius: 12,
					shadowOffset: { width: 0, height: -3 },
				},
			]}
		>
			<Icon {...mapTypeToIcon[type]} />
			<Text style={{ flexShrink: 1 }} ml="s16" preset="paragraphMedium" bold>
				{toast.message}
			</Text>
		</Box>
	)
}

const mapTypeToIcon: Record<ToastType, IconProps> = {
	success: {
		color: 'success',
		name: 'checkRound',
	},
	error: {
		color: 'error',
		name: 'errorRound',
	},
}
