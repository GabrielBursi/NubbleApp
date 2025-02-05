import { ImageURISource } from 'react-native'

import { FlashListProps } from '@shopify/flash-list'

import { StrictOmit } from '@/types/utils'

type URI = Required<ImageURISource>['uri']

export type PhotoListProps = {
	/** @default [] */
	urlImages?: URI[]
} & StrictOmit<
	FlashListProps<string>,
	| 'data'
	| 'renderItem'
	| 'keyExtractor'
	| 'showsVerticalScrollIndicator'
	| 'disableAutoLayout'
	| 'estimatedItemSize'
>
