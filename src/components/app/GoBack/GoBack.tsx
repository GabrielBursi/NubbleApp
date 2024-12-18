import React, { memo } from 'react'

import { TouchableOpacityBox, Icon, Text } from '@/components/ui'
import { useNavigationApp } from '@/hooks'

const GoBackMemoized = () => {
	const { navigationAppStack } = useNavigationApp()

	return (
		<TouchableOpacityBox
			onPress={navigationAppStack.goBack}
			mb="s24"
			flexDirection="row"
		>
			<Icon name="arrowLeft" color="primary" />
			<Text preset="paragraphMedium" semiBold ml="s8">
				Voltar
			</Text>
		</TouchableOpacityBox>
	)
}

export const GoBack = memo(GoBackMemoized)
