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
import { Pressable, TextInput as RNTextInput, TextStyle } from 'react-native'

import { Box } from '@/components/ui/Box/Box'
import { RightIconTextInput } from '@/components/ui/RightIconTextInput/RightIconTextInput'
import { Text } from '@/components/ui/Text/Text'
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
			allowClear = true,
			...rnTextInputProps
		},
		externalRef
	) => {
		const { colors, font } = useAppTheme()
		const { fontSizes } = useFontFamily()
		const internalRef = useRef<RNTextInput>(null)
		const [isFocused, setIsFocused] = useState(false)

		useImperativeHandle(externalRef, () => internalRef.current!, [])

		useEffect(() => {
			if (isFocused) {
				internalRef.current?.focus()
			} else {
				internalRef.current?.blur()
			}
		}, [isFocused, internalRef])

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
							ref={internalRef}
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
						<RightIconTextInput
							allowClear={allowClear}
							isFocused={isFocused}
							loading={loading}
							rightIcon={RightComponent}
						/>
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
