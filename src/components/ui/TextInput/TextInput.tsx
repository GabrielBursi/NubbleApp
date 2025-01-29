import React, {
	ComponentProps,
	forwardRef,
	memo,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react'
import {
	ActivityIndicator,
	Pressable,
	TextInput as RNTextInput,
	TextStyle,
} from 'react-native'

import { Box, Text } from '@/components/ui'
import { useAppTheme, useFontFamily } from '@/hooks'

import { TextInputProps } from './TextInput.types'

const TextInputMemoized = forwardRef<RNTextInput, Readonly<TextInputProps>>(
	(
		{
			label,
			errorMessage,
			LeftComponent,
			RightComponent,
			boxProps,
			disabled = false,
			loading = false,
			...rnTextInputProps
		},
		refExterna
	) => {
		const { colors, font } = useAppTheme()
		const { fontSizes } = useFontFamily()
		const inputRefInterna = useRef<RNTextInput>(null)
		const [isFocused, setIsFocused] = useState(false)

		useImperativeHandle(refExterna, () => inputRefInterna.current!, [])

		useEffect(() => {
			if (isFocused) {
				inputRefInterna.current?.focus()
			} else {
				inputRefInterna.current?.blur()
			}
		}, [isFocused, inputRefInterna])

		const $textInputContainer: ComponentProps<typeof Box> = useMemo(() => {
			let styleContainer: ComponentProps<typeof Box> = {
				flexDirection: 'row',
				borderWidth: 1,
				borderColor: 'gray4',
				padding: 's16',
				borderRadius: 's12',
			}

			if (isFocused) {
				styleContainer = {
					...styleContainer,
					borderWidth: 2,
					borderColor: 'primary',
				}
			}

			if (disabled) {
				styleContainer = {
					...styleContainer,
					backgroundColor: 'gray5',
				}
			}

			if (errorMessage) {
				styleContainer = {
					...styleContainer,
					borderWidth: 2,
					borderColor: 'error',
				}
			}

			return styleContainer
		}, [disabled, errorMessage, isFocused])

		const $textInputStyle: TextStyle = useMemo(
			() => ({
				padding: 0,
				flexGrow: 1,
				flexShrink: 1,
				fontFamily: font.family.regular,
				...fontSizes.paragraphMedium,
			}),
			[font, fontSizes]
		)

		return (
			<Box mb="s20" flexGrow={1} flexShrink={1} {...boxProps}>
				<Pressable
					accessible
					accessibilityLabel={label}
					accessibilityState={{
						selected: isFocused,
						disabled: disabled,
					}}
					onPress={() => setIsFocused(true)}
				>
					{label && (
						<Text preset="paragraphMedium" marginBottom="s4">
							{label}
						</Text>
					)}
					<Box {...$textInputContainer} testID="container-internal-input">
						{LeftComponent && (
							<Box justifyContent="center" mr="s16">
								{LeftComponent}
							</Box>
						)}
						<RNTextInput
							ref={inputRefInterna}
							placeholder="Digite aqui"
							autoCapitalize="none"
							testID="internal-input"
							{...rnTextInputProps}
							placeholderTextColor={colors.gray2}
							style={$textInputStyle}
							editable={!disabled}
							onBlur={() => setIsFocused(false)}
							onFocus={() => setIsFocused(true)}
							accessible
						/>
						{loading && (
							<Box justifyContent="center" ml="s16">
								<ActivityIndicator testID="spin-indicator" size="small" />
							</Box>
						)}
						{RightComponent && !loading && (
							<Box justifyContent="center" ml="s16">
								{RightComponent}
							</Box>
						)}
					</Box>
					{errorMessage && (
						<Text color="error" preset="paragraphSmall" bold>
							{errorMessage}
						</Text>
					)}
				</Pressable>
			</Box>
		)
	}
)

export const TextInput = memo(TextInputMemoized)
