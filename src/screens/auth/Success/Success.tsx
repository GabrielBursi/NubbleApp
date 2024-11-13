import React from 'react'

import { ScreenTemplate } from '@/templates'
import { Button, Icon, Text } from '@/components'

export const SuccessScreen = () => {
	return (
		<ScreenTemplate>
			<Icon name="checkRound" color="success" />
			<Text preset="headingLarge" mt="s24">
				Título
			</Text>
			<Text preset="paragraphLarge" mt="s16">
				Descrição
			</Text>
			<Button title="Voltar ao início" mt="s40" />
		</ScreenTemplate>
	)
}
