import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'

import { Box, Button, Text } from '@/components'

import { EmptyListProps } from './EmptyList.types'

const EmptyListMemoized = ({
	emptyMessage = 'A lista está vazia',
	error,
	errorMessage = 'Ocorreu um erro ao tentar carregar a lista',
	loading,
	refetch,
}: Readonly<EmptyListProps>) => {
	let component = (
		<Text bold preset="paragraphMedium">
			{emptyMessage}
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
					{errorMessage}
				</Text>
				<Button
					title="Recarregar"
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

export const EmptyList = memo(EmptyListMemoized)
