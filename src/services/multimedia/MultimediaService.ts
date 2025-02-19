import { ImageForUpload } from './models'

class MultimediaServiceSingleton {
	prepareImageForUpload(imageUri: string): ImageForUpload {
		//TODO: implementar
		return {
			uri: imageUri,
			name: 'name',
			type: 'image/png',
		}
	}
}

export const MultimediaService = new MultimediaServiceSingleton()
