import { ImageURISource } from 'react-native'

type URI = Required<ImageURISource>['uri']

export type PhotoListProps = {
	/** @default [] */
	urlImages?: URI[]
}
