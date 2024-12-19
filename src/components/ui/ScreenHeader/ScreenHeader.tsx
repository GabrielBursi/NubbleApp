import React, { memo } from 'react'

import { Box, GoBack, Text } from '@/components'

import { ScreenHeaderProps } from './ScreenHeader.types'

const ICON_SIZE = 20

const ScreenHeaderMemoized = ({
	canGoBack = false,
	title,
}: Readonly<ScreenHeaderProps>) => {
	return (
		<Box
			flexDirection="row"
			mb="s24"
			alignItems="center"
			justifyContent="space-between"
		>
			{canGoBack && <GoBack />}
			{title && <Text preset="headingSmall">{title}</Text>}
			{title && <Box width={ICON_SIZE} />}
		</Box>
	)
}

export const ScreenHeader = memo(ScreenHeaderMemoized)
