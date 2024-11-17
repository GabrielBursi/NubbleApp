import React from 'react'

import { Button, Icon, Text } from '@/components'
import { ScreenTemplate } from '@/templates'
import { SuccessScreenProps } from '@/types/screens'

export const SuccessScreen = ({ route, navigation }: SuccessScreenProps) => {
	return (
		<ScreenTemplate>
			<Icon {...route.params.icon} />
			<Text preset="headingLarge" mt="s24">
				{route.params.title}
			</Text>
			<Text preset="paragraphLarge" mt="s16">
				{route.params.description}
			</Text>
			<Button title="Voltar ao início" onPress={navigation.goBack} mt="s40" />
		</ScreenTemplate>
	)
}
