import { FlashListProps } from '@shopify/flash-list'

import { PhotoList } from '@/services/multimedia'
import { StrictOmit } from '@/types/utils'

export type PhotoListProps = {
	/** @default [] */
	photos?: PhotoList[]
	onPressImage?: (selectedImage: PhotoList) => void
	indexSelectedImage?: number
} & StrictOmit<
	FlashListProps<PhotoList>,
	| 'data'
	| 'renderItem'
	| 'keyExtractor'
	| 'showsVerticalScrollIndicator'
	| 'disableAutoLayout'
	| 'estimatedItemSize'
	| 'extraData'
>
