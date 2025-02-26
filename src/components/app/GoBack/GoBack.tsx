import React, { memo } from 'react'

import { TouchableOpacityBox, Icon, Text } from '@/components/ui'
import { useNavigationApp } from '@/hooks'

import { GoBackProps } from './GoBack.types'

const GoBackMemoized = ({ showLabel = true }: GoBackProps) => {
	const { navigationAppStack } = useNavigationApp()

	return (
		<TouchableOpacityBox
			onPress={navigationAppStack.goBack}
			flexDirection="row"
			alignItems="center"
			mr={showLabel ? 's10' : undefined}
		>
			<Icon name="arrowLeft" color="primary" size={20} />
			{showLabel && (
				<Text preset="paragraphMedium" semiBold ml="s8">
					Voltar
				</Text>
			)}
		</TouchableOpacityBox>
	)
}

export const GoBack = memo(GoBackMemoized)
