import React, { PropsWithChildren } from 'react'
import { useAppSafeArea } from '@/hooks'
import { Box, Container, GoBack } from '@/components'
import { ScreenTemplateProps } from './Screen.types'

export const ScreenTemplate = ({
	children,
	canGoBack = false,
}: PropsWithChildren<ScreenTemplateProps>) => {
	const { top } = useAppSafeArea()

	return (
		<Box style={{ paddingTop: top }} flex={1}>
			<Container>
				{canGoBack && <GoBack />}
				{children}
			</Container>
		</Box>
	)
}
