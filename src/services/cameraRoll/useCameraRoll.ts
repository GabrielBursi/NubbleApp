import { useEffect, useState } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { Platform, PermissionsAndroid } from 'react-native'

import { CameraRoll } from '@react-native-camera-roll/camera-roll'

export const useCameraRoll = () => {
	const [list, setList] = useState<string[]>([])
	async function getPhotos() {
		const hasPermission = await hasAndroidPermission()
		if (hasPermission) {
			const photoPage = await CameraRoll.getPhotos({ first: 10 })
			setList(photoPage.edges.map((edge) => edge.node.image.uri))
		}
		return []
	}

	useEffect(() => {
		getPhotos()
			.then(() => console.log('deu certo!'))
			.catch((err) => console.log(err))
	}, [])

	return {
		list,
	}
}

async function hasAndroidPermission() {
	if (Platform.OS === 'ios') {
		return true
	}
	const getCheckPermissionPromise = () => {
		if (Number(Platform.Version) >= 33) {
			return Promise.all([
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
				),
				PermissionsAndroid.check(
					PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
				),
			]).then(
				([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
					hasReadMediaImagesPermission && hasReadMediaVideoPermission
			)
		} else {
			return PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			)
		}
	}

	const hasPermission = await getCheckPermissionPromise()
	if (hasPermission) {
		return true
	}
	const getRequestPermissionPromise = () => {
		if (Number(Platform.Version) >= 33) {
			return PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
			]).then(
				(statuses) =>
					statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
						PermissionsAndroid.RESULTS.GRANTED &&
					statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
						PermissionsAndroid.RESULTS.GRANTED
			)
		} else {
			return PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			).then((status) => status === PermissionsAndroid.RESULTS.GRANTED)
		}
	}

	return await getRequestPermissionPromise()
}
