import React, { memo, useCallback, useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

import { Icon, Text, TouchableOpacityBox } from '@/components'

import { ActionIconProps } from './ActionIcon.types'

const ActionIconMemoized = ({
	icon,
	marked = false,
	onPress,
	label,
	positionLabel = 'right',
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

	const formatTextLabel = useCallback((label: string): string => {
		return label
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}, [])

	const formatNumberLabel = useCallback((label: number) => {
		const formattedLabel = new Intl.NumberFormat('en', {
			notation: 'compact',
			compactDisplay: 'short',
			minimumFractionDigits: 0,
			maximumFractionDigits: 1,
		}).format(label)

		return formattedLabel
	}, [])

	const formattedLabel = useMemo(() => {
		if (typeof label === 'string') return formatTextLabel(label)

		if (typeof label === 'number') return formatNumberLabel(label)

		return null
	}, [formatNumberLabel, label, formatTextLabel])

	return (
		<TouchableOpacityBox
			flexDirection="row"
			alignItems="center"
			gap="s4"
			onPress={handlePress}
		>
			{formattedLabel && positionLabel === 'left' && (
				<Text preset="paragraphSmall" bold>
					{formattedLabel}
				</Text>
			)}
			<Animated.View style={animatedStyle}>
				<Icon
					color={marked ? 'iconMarked' : undefined}
					name={marked ? icon.marked : icon.default}
				/>
			</Animated.View>
			{formattedLabel && positionLabel === 'right' && (
				<Text preset="paragraphSmall" bold>
					{formattedLabel}
				</Text>
			)}
		</TouchableOpacityBox>
	)
}

export const ActionIcon = memo(ActionIconMemoized)
