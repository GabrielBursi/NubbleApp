import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import {
	Camera,
	Templates,
	useCameraDevice,
	useCameraFormat,
} from 'react-native-vision-camera'

import {
	ActionIcon,
	Box,
	BoxProps,
	Icon,
	PermissionManager,
} from '@/components'
import { useAppSafeArea, useAppState } from '@/hooks'
import { MultimediaService } from '@/services/multimedia'
import { CameraScreenProps } from '@/types/screens'

const CAMERA_VIEW = Dimensions.get('screen').width
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2
const CONTROL_DIFF = 30

export const CameraScreen = ({ navigation }: Readonly<CameraScreenProps>) => {
	const { top } = useAppSafeArea()
	const [flashOn, setFlashOn] = useState(false)
	const [isReady, setIsReady] = useState(false)

	const cameraRef = useRef<Camera>(null)

	const takePhoto = async () => {
		if (cameraRef.current) {
			const photoFile = await cameraRef.current?.takePhoto({
				flash: flashOn ? 'on' : 'off',
			})

			navigation.navigate('PublishPostScreen', {
				imageUri: MultimediaService.prepareImageUri(photoFile.path),
			})
		}
	}

	const device = useCameraDevice('back', {
		physicalDevices: [
			'ultra-wide-angle-camera',
			'wide-angle-camera',
			'telephoto-camera',
		],
	})

	const format = useCameraFormat(device, Templates.Instagram)

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
						format={format}
						photo
						ref={cameraRef}
						onInitialized={() => setIsReady(true)}
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
						{isReady && (
							<ActionIcon
								size={80}
								name={{ default: 'cameraClick' }}
								color="grayWhite"
								// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
								onPress={takePhoto}
							/>
						)}
					</Box>
				</Box>
			</Box>
		</PermissionManager>
	)
}

const $controlAreaTop: BoxProps = {
	backgroundColor: 'black60',
	height: CONTROL_HEIGHT - CONTROL_DIFF,
	justifyContent: 'space-between',
	flexDirection: 'row',
	paddingHorizontal: 's24',
}
const $controlAreaBottom: BoxProps = {
	backgroundColor: 'black60',
	height: CONTROL_HEIGHT + CONTROL_DIFF,
	justifyContent: 'center',
	alignItems: 'center',
}
