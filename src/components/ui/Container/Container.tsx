import React, { PropsWithChildren } from 'react'

import { ContainerProps } from './Container.types'

import { Box } from '@/components/ui'

export const Container = ({
	children,
	...boxProps
}: Readonly<PropsWithChildren<ContainerProps>>) => {
	return (
		<Box
			testID="container"
			flex={1}
			paddingHorizontal="s24"
			width="100%"
			{...boxProps}
		>
			{children}
		</Box>
	)
}
