import React, { PropsWithChildren, useEffect } from 'react'
import { Linking, Platform } from 'react-native'

import { Box, Button, Loading, Text } from '@/components'
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
	<Box justifyContent="center" alignItems="center" flex={1}>
		{fallback}
	</Box>
)

const DeniedState = ({
	description,
	isNeverAskAgain,
}: Readonly<DeniedStateProps>) => (
	<Box justifyContent="center" alignItems="center" flex={1} gap="s10">
		<Text preset="headingSmall" textAlign="center">
			{description}
		</Text>
		{isNeverAskAgain && (
			<Box gap="s10">
				{Platform.OS === 'android' && (
					<Text
						preset="paragraphMedium"
						color="error"
						bold
						marginVertical="s16"
						textAlign="center"
					>
						É necessário abrir e fechar o App novamente após alterar as
						configurações
					</Text>
				)}
				<Button
					title="Abrir Configurações"
					// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises, @typescript-eslint/unbound-method
					onPress={Linking.openSettings}
				/>
			</Box>
		)}
	</Box>
)

export const PermissionManager = ({
	description = 'O aplicativo não tem permissão para acessar esse recurso.',
	permissionName,
	fallback,
	children,
	// eslint-disable-next-line sonarjs/function-return-type
}: Readonly<PropsWithChildren<PermissionManagerProps>>): React.JSX.Element => {
	const [{ status, isLoading }, checkPermission] = usePermission(permissionName)

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		checkPermission()
	}, [checkPermission])

	if (isLoading) return <LoadingState />

	if (status !== 'granted' && fallback)
		return <FallbackState fallback={fallback} />

	if (status === 'granted')
		return (
			<Box flex={1} justifyContent="center" alignItems="center">
				{children}
			</Box>
		)

	return (
		<DeniedState
			description={description}
			isNeverAskAgain={status === 'never_ask_again'}
		/>
	)
}
