import { useMemo } from 'react'
import { Dimensions } from 'react-native'

/**
 * @param numColumns
 * @default 4
 */
export const usePhotoList = (numColumns = 4) => {
	const SCREEN_WIDTH = Dimensions.get('screen').width
	const PHOTO_ITEM_WIDTH = useMemo(
		() => SCREEN_WIDTH / numColumns,
		[SCREEN_WIDTH, numColumns]
	)

	return {
		PHOTO_ITEM_WIDTH,
	} as const
}
