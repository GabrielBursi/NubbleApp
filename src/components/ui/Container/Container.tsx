import React, { PropsWithChildren } from 'react'

import { Box } from '@/components/ui'

import { ContainerProps } from './Container.types'

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
