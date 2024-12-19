import { ImageProps } from 'react-native'

import { StrictOmit } from '@/types/utils'

export type ProfileAvatarProps = {
	imageURL: string
	/** @default 32 */
	size?: number
	/** @default 14 */
	borderRadius?: number
} & StrictOmit<ImageProps, 'source' | 'src'>
