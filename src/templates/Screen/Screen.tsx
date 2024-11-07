import React, { PropsWithChildren } from 'react'
import { useAppSafeArea } from '@/hooks'
import { Box, Container } from '@/components'

export const ScreenTemplate = ({ children }: PropsWithChildren) => {
	const { top } = useAppSafeArea()

	return (
		<Box style={{ paddingTop: top }} flex={1}>
			<Container>{children}</Container>
		</Box>
	)
}
