import React, { ComponentProps } from 'react'
import { Pressable, View } from 'react-native'

import { useAppTheme } from '@/hooks'

import { ArrowLeftIcon } from '../../../assets/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '../../../assets/icons/ArrowRightIcon'
import { BellIcon } from '../../../assets/icons/BellIcon'
import { BellOnIcon } from '../../../assets/icons/BellOnIcon'
import { BookmarkFillIcon } from '../../../assets/icons/BookmarkFillIcon'
import { BookmarkIcon } from '../../../assets/icons/BookmarkIcon'
import { CameraClick } from '../../../assets/icons/CameraClick'
import { CameraIcon } from '../../../assets/icons/CameraIcon'
import { ChatIcon } from '../../../assets/icons/ChatIcon'
import { ChatOnIcon } from '../../../assets/icons/ChatOnIcon'
import { CheckIcon } from '../../../assets/icons/CheckIcon'
import { CheckRoundIcon } from '../../../assets/icons/CheckRoundIcon'
import { ChevronRightIcon } from '../../../assets/icons/ChevronRightIcon'
import { CloseIcon } from '../../../assets/icons/CloseIcon'
import { CommentIcon } from '../../../assets/icons/CommentIcon'
import { ErrorRoundIcon } from '../../../assets/icons/ErrorRoundIcon'
import { EyeOffIcon } from '../../../assets/icons/EyeOffIcon'
import { EyeOnIcon } from '../../../assets/icons/EyeOnIcon'
import { FlashOffIcon } from '../../../assets/icons/FlashOffIcon'
import { FlashOnIcon } from '../../../assets/icons/FlashOnIcon'
import { HeartFillIcon } from '../../../assets/icons/HeartFillIcon'
import { HeartIcon } from '../../../assets/icons/HeartIcon'
import { HomeFillIcon } from '../../../assets/icons/HomeFillIcon'
import { HomeIcon } from '../../../assets/icons/HomeIcon'
import { MessageIcon } from '../../../assets/icons/MessageIcon'
import { MessageRoundIcon } from '../../../assets/icons/MessageRoundIcon'
import { NewPostIcon } from '../../../assets/icons/NewPostIcon'
import { ProfileFillIcon } from '../../../assets/icons/ProfileFillIcon'
import { ProfileIcon } from '../../../assets/icons/ProfileIcon'
import { SearchIcon } from '../../../assets/icons/SearchIcon'
import { SettingsIcon } from '../../../assets/icons/SettingsIcon'
import { TrashIcon } from '../../../assets/icons/TrashIcon'

import { IconProps } from './Icon.types'

export const iconRegistry = {
	arrowLeft: ArrowLeftIcon,
	arrowRight: ArrowRightIcon,
	bell: BellIcon,
	bellOn: BellOnIcon,
	bookmark: BookmarkIcon,
	bookmarkFill: BookmarkFillIcon,
	camera: CameraIcon,
	cameraClick: CameraClick,
	chat: ChatIcon,
	chatOn: ChatOnIcon,
	close: CloseIcon,
	check: CheckIcon,
	checkRound: CheckRoundIcon,
	errorRound: ErrorRoundIcon,
	comment: CommentIcon,
	chevronRight: ChevronRightIcon,
	eyeOn: EyeOnIcon,
	eyeOff: EyeOffIcon,
	flashOn: FlashOnIcon,
	flashOff: FlashOffIcon,
	heart: HeartIcon,
	heartFill: HeartFillIcon,
	home: HomeIcon,
	homeFill: HomeFillIcon,
	message: MessageIcon,
	messageRound: MessageRoundIcon,
	newPost: NewPostIcon,
	profile: ProfileIcon,
	profileFill: ProfileFillIcon,
	search: SearchIcon,
	settings: SettingsIcon,
	trash: TrashIcon,
} as const

export const Icon = ({
	name,
	color = 'backgroundContrast',
	fillColor = 'background',
	size,
	onPress,
}: Readonly<IconProps>) => {
	const { colors } = useAppTheme()
	const SVGIcon = iconRegistry[name]

	const iconProps: ComponentProps<typeof SVGIcon> = {
		size,
		color: colors[color],
		fillColor: colors[fillColor],
	}

	if (onPress) {
		return (
			<Pressable
				role="img"
				accessible
				accessibilityLabel={name}
				aria-label={name}
				accessibilityRole="image"
				testID={name}
				hitSlop={10}
				onPress={onPress}
				android_disableSound
			>
				<SVGIcon {...iconProps} />
			</Pressable>
		)
	}

	return (
		<View
			role="img"
			accessible
			accessibilityLabel={name}
			aria-label={name}
			accessibilityRole="image"
			testID={name}
		>
			<SVGIcon {...iconProps} />
		</View>
	)
}
