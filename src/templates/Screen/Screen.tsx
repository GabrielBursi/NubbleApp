import React, { PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

import { Container, ScreenHeader } from '@/components'
import { useAppSafeArea, useAppTheme } from '@/hooks'

import { ContainerScreenProps, ScreenTemplateProps } from './Screen.types'

export function ScrollViewContainer({
	children,
	backgroundColor,
	style,
}: Readonly<ContainerScreenProps>) {
	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			// eslint-disable-next-line react-native/no-inline-styles
			style={[{ backgroundColor, flex: 1 }, style]}
		>
			{children}
		</ScrollView>
	)
}
export function ViewContainer({
	children,
	backgroundColor,
	style,
}: Readonly<ContainerScreenProps>) {
	// eslint-disable-next-line react-native/no-inline-styles
	return <View style={[{ backgroundColor, flex: 1 }, style]}>{children}</View>
}

export const ScreenTemplate = ({
	children,
	canGoBack = false,
	scrollable = false,
	style,
	title,
	HeaderComponent,
	...boxProps
}: PropsWithChildren<ScreenTemplateProps>) => {
	const { top, bottom } = useAppSafeArea()
	const { colors } = useAppTheme()

	const ContainerScreen = scrollable ? ScrollViewContainer : ViewContainer

	return (
		<KeyboardAvoidingView
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<ContainerScreen
				style={{ paddingTop: top, paddingBottom: bottom }}
				backgroundColor={colors.background}
			>
				<Container flex={0}>
					<ScreenHeader
						HeaderComponent={HeaderComponent}
						canGoBack={canGoBack}
						title={title}
					/>
				</Container>
				<Container flex={1} style={style} {...boxProps}>
					{children}
				</Container>
			</ContainerScreen>
		</KeyboardAvoidingView>
	)
}
