import React, { PropsWithChildren } from 'react'
import { Text, View } from 'react-native'
import { MainTemplateProps } from './Main.types'

export const MainTemplate = ({
	children,
}: PropsWithChildren<Readonly<MainTemplateProps>>) => {
	return (
		<View>
			<Text accessibilityRole="text">Main</Text>
			{children}
		</View>
	)
}
