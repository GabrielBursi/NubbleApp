import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'

import { Box, Button, Text } from '@/components'

import { FeedEmptyProps } from './FeedEmpty.types'

export const FeedEmptyMemoized = ({
	error = null,
	loading = false,
	refetch,
}: Readonly<FeedEmptyProps>) => {
	let component = (
		<Text bold preset="paragraphMedium">
			Não há publicações no seu feed
		</Text>
	)

	if (loading) {
		component = (
			<ActivityIndicator
				color="primary"
				accessibilityLabel="loading"
				accessible
			/>
		)
	}

	if (error) {
		component = (
			<>
				<Text bold preset="paragraphMedium" mb="s16">
					Não foi possível carregar o feed 😢
				</Text>
				<Button
					title="recarregar"
					preset="outline"
					// eslint-disable-next-line sonarjs/no-misused-promises
					onPress={refetch}
				/>
			</>
		)
	}

	return (
		<Box flex={1} justifyContent="center" alignItems="center">
			{component}
		</Box>
	)
}

export const FeedEmpty = memo(FeedEmptyMemoized)
