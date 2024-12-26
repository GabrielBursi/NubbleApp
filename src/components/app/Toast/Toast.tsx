/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react'

import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import { ToastContent } from '@/components'
import { ToastPosition, useToast, useToastService } from '@/services/toast'

export const Toast = () => {
	const toast = useToast()
	const { hideToast } = useToastService()
	const opacity = useSharedValue(0)
	const position: ToastPosition = toast?.position ?? 'top'

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		position: 'absolute',
		alignSelf: 'center',
	}))

	useEffect(() => {
		if (toast) {
			opacity.value = withTiming(1, { duration: 300 })

			const timer = setTimeout(() => {
				opacity.value = withTiming(0, { duration: 300 }, () => {
					runOnJS(hideToast)()
				})
			}, toast.duration ?? 2000)

			return () => clearTimeout(timer)
		}
	}, [toast, hideToast, opacity])

	if (!toast) {
		return null
	}

	return (
		<Animated.View style={[animatedStyle, { [position]: 100 }]}>
			<ToastContent {...toast} />
		</Animated.View>
	)
}
