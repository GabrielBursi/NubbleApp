import React from 'react'
import { GestureResponderEvent } from 'react-native'

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

import { Icon, Text, TouchableOpacityBox } from '@/components'

import { ActionIconProps } from './ActionIcon.types'

export const ActionIcon = ({
	icon,
	marked = false,
	onPress,
	count = 0,
}: Readonly<ActionIconProps>) => {
	const scale = useSharedValue(1)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}))

	const handlePress = (ev: GestureResponderEvent) => {
		scale.value = 1.2
		scale.value = withSpring(1, { stiffness: 200 })
		onPress?.(ev)
	}

	const countFormatted = new Intl.NumberFormat('en', {
		notation: 'compact',
		compactDisplay: 'short',
		minimumFractionDigits: 0,
		maximumFractionDigits: 1,
	}).format(count)

	return (
		<TouchableOpacityBox
			flexDirection="row"
			alignItems="center"
			gap="s4"
			onPress={handlePress}
		>
			<Animated.View style={animatedStyle}>
				<Icon
					color={marked ? 'iconMarked' : undefined}
					name={marked ? icon.marked : icon.default}
				/>
			</Animated.View>
			<Text preset="paragraphSmall" bold>
				{countFormatted}
			</Text>
		</TouchableOpacityBox>
	)
}
