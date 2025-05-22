import { ImageProps } from 'react-native'

import { StrictOmit } from '@/types/utils'

export type ProfileAvatarProps = {
	/** @default null */
	imageURL?: string | null
	/** @default 32 */
	size?: number
	/** @default 14 */
	borderRadius?: number
	authorId?: number
} & StrictOmit<ImageProps, 'source' | 'src'>
