import React, { memo, useMemo } from 'react'

import { Box, GoBack } from '@/components'
import { Text } from '@/components/ui/Text/Text'

import { ScreenHeaderProps } from './ScreenHeader.types'

const ScreenHeaderMemoized = ({
	canGoBack = false,
	title,
	HeaderComponent,
}: Readonly<ScreenHeaderProps>) => {
	const showBackLabel = useMemo(
		() => !title && !HeaderComponent,
		[title, HeaderComponent]
	)

	return (
		<Box
			flexDirection="row"
			mb="s24"
			alignItems="center"
			justifyContent="space-between"
		>
			{canGoBack && <GoBack showLabel={showBackLabel} />}
			{HeaderComponent}
			{title && <Text preset="headingSmall">{title}</Text>}
			{title && <Box width={20} />}
		</Box>
	)
}

export const ScreenHeader = memo(ScreenHeaderMemoized)
