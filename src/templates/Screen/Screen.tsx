import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

import { useAppSafeArea, useAppTheme } from '@/hooks'
import { Container, GoBack } from '@/components'

import { ContainerScreenProps, ScreenTemplateProps } from './Screen.types'

export function ScrollViewContainer({
	children,
	backgroundColor,
}: Readonly<ContainerScreenProps>) {
	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ backgroundColor, flex: 1 }}
		>
			{children}
		</ScrollView>
	)
}
export function ViewContainer({
	children,
	backgroundColor,
}: Readonly<ContainerScreenProps>) {
	// eslint-disable-next-line react-native/no-inline-styles
	return <View style={{ backgroundColor, flex: 1 }}>{children}</View>
}

export const ScreenTemplate = ({
	children,
	canGoBack = false,
	scrollable = false,
}: PropsWithChildren<ScreenTemplateProps>) => {
	const { top } = useAppSafeArea()
	const { colors } = useAppTheme()

	const ContainerScreen = scrollable ? ScrollViewContainer : ViewContainer

	return (
		<KeyboardAvoidingView
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ContainerScreen backgroundColor={colors.background}>
				<Container flex={1} style={{ paddingTop: top }}>
					{canGoBack && <GoBack />}
					{children}
				</Container>
			</ContainerScreen>
		</KeyboardAvoidingView>
	)
}
