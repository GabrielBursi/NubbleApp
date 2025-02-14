import React, { ComponentProps, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { Camera, useCameraDevice } from 'react-native-vision-camera'

import { Box, Icon, PermissionManager } from '@/components'
import { useAppSafeArea, useAppState } from '@/hooks'
import { CameraScreenProps } from '@/types/screens'

const CAMERA_VIEW = Dimensions.get('screen').width
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2
const CONTROL_DIFF = 30

export const CameraScreen = ({ navigation }: Readonly<CameraScreenProps>) => {
	const { top } = useAppSafeArea()
	const [flashOn, setFlashOn] = useState(false)

	const device = useCameraDevice('back')

	const isFocused = useIsFocused()
	const appState = useAppState()
	const isActive = isFocused && appState === 'active'

	const toggleFlash = () => {
		setFlashOn((prev) => !prev)
	}

	return (
		<PermissionManager
			permissionName="camera"
			description="O aplicativo não tem permissão para acessar a câmera do dispositivo."
		>
			<Box flex={1}>
				{device && (
					<Camera
						style={StyleSheet.absoluteFill}
						device={device}
						isActive={isActive}
					/>
				)}
				<Box flex={1} justifyContent="space-between">
					<Box {...$controlAreaTop} style={{ paddingTop: top }}>
						<Icon
							size={20}
							color="grayWhite"
							name="arrowLeft"
							onPress={navigation.goBack}
						/>
						<Icon
							size={20}
							color="grayWhite"
							name={flashOn ? 'flashOn' : 'flashOff'}
							onPress={toggleFlash}
						/>
						<Box width={20} />
					</Box>

					<Box {...$controlAreaBottom}>
						<Icon size={80} name="cameraClick" color="grayWhite" />
					</Box>
				</Box>
			</Box>
		</PermissionManager>
	)
}

const $controlAreaTop: ComponentProps<typeof Box> = {
	backgroundColor: 'black60',
	height: CONTROL_HEIGHT - CONTROL_DIFF,
	justifyContent: 'space-between',
	flexDirection: 'row',
	paddingHorizontal: 's24',
}
const $controlAreaBottom: ComponentProps<typeof Box> = {
	backgroundColor: 'black60',
	height: CONTROL_HEIGHT + CONTROL_DIFF,
	justifyContent: 'center',
	alignItems: 'center',
}
