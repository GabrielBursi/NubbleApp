import React from 'react'

import { Box, Container, Icon, SimpleLogo } from '@/components'
import { useAppSafeArea } from '@/hooks'

export const FeedHeader = () => {
	const { top } = useAppSafeArea()

	return (
		<Container>
			<Box
				flexDirection="row"
				justifyContent="space-between"
				paddingBottom="s24"
				style={{ paddingTop: top }}
			>
				<SimpleLogo width={70} />
				<Box flexDirection="row" gap="s24" justifyContent="space-between">
					<Icon name="search" />
					<Icon name="bell" />
					<Icon name="comment" />
				</Box>
			</Box>
		</Container>
	)
}
