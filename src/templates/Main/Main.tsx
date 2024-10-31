import React, { PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { MainTemplateProps } from './Main.types'
import * as S from './Main.styles'

export const MainTemplate = ({
	children,
}: PropsWithChildren<Readonly<MainTemplateProps>>) => {
	return (
		<S.Main>
			<Text accessibilityRole="text">Main</Text>
			{children}
		</S.Main>
	)
}
