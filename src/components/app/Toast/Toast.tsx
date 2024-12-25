/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Dimensions } from 'react-native'

import { Box, Icon, Text } from '@/components'

export const Toast = () => {
	return (
		<Box
			top={100}
			position="absolute"
			backgroundColor="background"
			alignSelf="center"
			alignItems="center"
			padding="s16"
			borderRadius="s16"
			flexDirection="row"
			opacity={0.95}
			maxWidth={Dimensions.get('screen').width * 0.9}
		>
			<Icon color="success" name="checkRound" />
			<Text style={{ flexShrink: 1 }} ml="s16" preset="paragraphMedium" bold>
				Toast Component
			</Text>
		</Box>
	)
}
