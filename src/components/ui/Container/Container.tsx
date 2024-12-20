import React, { PropsWithChildren } from 'react'
import { Dimensions } from 'react-native'

import { Box } from '@/components/ui'

import { ContainerProps } from './Container.types'

export const Container = ({
	children,
	...boxProps
}: Readonly<PropsWithChildren<ContainerProps>>) => {
	const screenWidth = Dimensions.get('screen').width

	return (
		<Box
			testID="container"
			flex={1}
			paddingHorizontal="s24"
			width={screenWidth}
			{...boxProps}
		>
			{children}
		</Box>
	)
}
