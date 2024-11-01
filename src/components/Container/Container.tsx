import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { useAppTheme } from '@/hooks'

export const Container = ({ children }: Readonly<PropsWithChildren>) => {
	const theme = useAppTheme()

	return (
		<View
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				flex: 1,
				marginLeft: 'auto',
				marginRight: 'auto',
				paddingLeft: theme.spacing.s32,
				paddingRight: theme.spacing.s32,
				width: '100%',
			}}
			testID="container"
		>
			{children}
		</View>
	)
}
