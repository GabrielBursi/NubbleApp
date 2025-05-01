/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Dimensions } from 'react-native'

import { Box, Icon, Text } from '@/components'
import { IconProps } from '@/components/ui/Icon/Icon.types'
import { useAppTheme } from '@/hooks'
import { ToastType } from '@/services/toast'

import { ToastContentProps } from './ToastContent.types'

export const ToastContent = (toast: Readonly<ToastContentProps>) => {
	const { colors } = useAppTheme()

	const type: ToastType = toast?.type ?? 'success'

	return (
		<Box
			backgroundColor="background"
			alignItems="center"
			padding="s16"
			borderRadius="s16"
			flexDirection="row"
			opacity={0.95}
			maxWidth={Dimensions.get('screen').width * 0.9}
			style={{
				elevation: 10,
				shadowColor: colors.primaryShadow,
				shadowOpacity: 0.05,
				shadowRadius: 12,
				shadowOffset: { width: 0, height: -3 },
			}}
		>
			<Icon {...mapTypeToIcon[type]} />
			<Text style={{ flexShrink: 1 }} ml="s16" preset="paragraphMedium" bold>
				{toast.message}
			</Text>
			{toast?.action?.onPress && (
				<Text
					ml="s8"
					color="iconMarked"
					preset="paragraphMedium"
					bold
					onPress={toast.action.onPress}
				>
					{toast.action.title}
				</Text>
			)}
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
