import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import { Linking, Platform } from 'react-native'

import { Box, Button, Container, Loading, Text } from '@/components'
import { useNavigationApp } from '@/hooks'
import { usePermission } from '@/services/permission'

import {
	DeniedStateProps,
	FallbackStateProps,
	PermissionManagerProps,
} from './PermissionManager.types'

const LoadingState = () => (
	<Box justifyContent="center" alignItems="center" flex={1}>
		<Loading color="greenPrimary" />
	</Box>
)

const FallbackState = ({ fallback }: Readonly<FallbackStateProps>) => (
	<Container>
		<Box justifyContent="center" alignItems="center" flex={1}>
			{fallback}
		</Box>
	</Container>
)

const DeniedState = ({ description, status }: Readonly<DeniedStateProps>) => {
	const { navigationAppTab } = useNavigationApp()

	const goBackToFeed = () => {
		navigationAppTab.navigate('HomeScreen')
	}

	return (
		<Container>
			<Box justifyContent="center" alignItems="center" flex={1} gap="s10">
				<Text preset="headingSmall" textAlign="center">
					{description}
				</Text>
				{status === 'unavailable' && (
					<Text
						preset="paragraphMedium"
						color="error"
						bold
						marginVertical="s16"
						textAlign="center"
					>
						Esse recurso não está disponível para esse dispositivo.
					</Text>
				)}
				<Box gap="s10" width="100%">
					{Platform.OS === 'android' && (
						<Text
							preset="paragraphMedium"
							color="error"
							bold
							marginVertical="s16"
							textAlign="center"
						>
							É necessário abrir e fechar o App novamente após alterar as
							configurações.
						</Text>
					)}
					<Button
						title="Abrir Configurações"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises, @typescript-eslint/unbound-method
						onPress={Linking.openSettings}
					/>
				</Box>
				<Button
					title="Voltar para o feed"
					onPress={goBackToFeed}
					width="100%"
				/>
			</Box>
		</Container>
	)
}

export const PermissionManager = ({
	description = 'O aplicativo não tem permissão para acessar esse recurso.',
	permissionName,
	fallback,
	children,
	isLoading: externalIsLoading,
	status: externalStatus,
}: Readonly<PropsWithChildren<PermissionManagerProps>>): React.JSX.Element => {
	const [
		{ status: internalStatus, isLoading: internalIsLoading },
		checkPermission,
	] = usePermission(permissionName)

	const status = useMemo(
		() => externalStatus ?? internalStatus,
		[externalStatus, internalStatus]
	)
	const isLoading = useMemo(
		() => externalIsLoading ?? internalIsLoading,
		[externalIsLoading, internalIsLoading]
	)

	useEffect(() => {
		if (!externalStatus && externalIsLoading === undefined)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			checkPermission()
	}, [checkPermission, externalIsLoading, externalStatus])

	if (isLoading) return <LoadingState />

	if (status !== 'granted' && fallback)
		return <FallbackState fallback={fallback} />

	if (status === 'granted') return <Box flex={1}>{children}</Box>

	return <DeniedState description={description} status={status} />
}
