import { useCallback } from 'react'

import { useCameraRoll as useRNCameraRoll } from '@react-native-camera-roll/camera-roll'

import { PhotoListPaginated } from './models'

export const useAppCameraRollService = () => {
	const [photos, getPhotos] = useRNCameraRoll()

	const getUriPhotos = useCallback(
		async (cursor?: string): Promise<Readonly<PhotoListPaginated>> => {
			await getPhotos({ first: 12, after: cursor })
			const photoList = photos.edges.map((edge) => edge.node.image.uri)
			return {
				photoList,
				endCursor: photos.page_info.end_cursor,
				hasNextPage: photos.page_info.has_next_page,
			} as const
		},
		[
			getPhotos,
			photos.edges,
			photos.page_info.end_cursor,
			photos.page_info.has_next_page,
		]
	)

	return {
		getUriPhotos,
	} as const
}
