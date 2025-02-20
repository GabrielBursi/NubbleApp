import { Platform } from 'react-native'

import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

import { ImageForUpload } from './models'

class MultimediaServiceSingleton {
	/**
	 *
	 * @param imageUri image path
	 * @returns `ImageForUpload` - an object with props requested by a `FormData`
	 */
	async prepareImageForUpload(imageUri: string): Promise<ImageForUpload> {
		try {
			const image = await manipulateAsync(this.prepareImageUri(imageUri), [], {
				compress: 0.5,
				format: SaveFormat.JPEG,
			})
			return {
				uri: image.uri,
				name: Date.now().toString(),
				type: 'image/jpeg',
			}
		} catch {
			return {
				uri: imageUri,
				name: Date.now().toString(),
				type: 'image/jpeg',
			}
		}
	}

	/**
	 *
	 * @param imageUri image path as provided by either by camera or gallery modules
	 *
	 * @returns an imageUri ready to be used in the `Image` component and `FormData` requests
	 */
	prepareImageUri(imageUri: string): string {
		if (Platform.OS !== 'android') {
			return imageUri
		}

		if (imageUri.startsWith('file://')) {
			return imageUri
		}

		return `file://${imageUri}`
	}
}

export const MultimediaService = new MultimediaServiceSingleton()
