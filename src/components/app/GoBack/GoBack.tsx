import React, { memo } from 'react'

import { useNavigation } from '@react-navigation/native'

import { TouchableOpacityBox, Icon, Text } from '@/components/ui'

const GoBackMemoized = () => {
	const { goBack } = useNavigation()

	return (
		<TouchableOpacityBox onPress={goBack} mb="s24" flexDirection="row">
			<Icon name="arrowLeft" color="primary" />
			<Text preset="paragraphMedium" semiBold ml="s8">
				Voltar
			</Text>
		</TouchableOpacityBox>
	)
}

export const GoBack = memo(GoBackMemoized)
