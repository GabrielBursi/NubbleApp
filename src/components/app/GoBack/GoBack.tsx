import React, { memo } from 'react'

import { TouchableOpacityBox, Icon, Text } from '@/components/ui'
import { useNavigationApp } from '@/hooks'

const GoBackMemoized = () => {
	const { navigationAppStack } = useNavigationApp()

	return (
		<TouchableOpacityBox
			onPress={navigationAppStack.goBack}
			flexDirection="row"
			width={80}
		>
			<Icon name="arrowLeft" color="primary" />
			<Text preset="paragraphMedium" semiBold ml="s8">
				Voltar
			</Text>
		</TouchableOpacityBox>
	)
}

export const GoBack = memo(GoBackMemoized)
