import React, {
	ComponentProps,
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Pressable, TextInput as RNTextInput, TextStyle } from 'react-native'

import { TextInputProps } from './TextInput.types'

import { Box, Text } from '@/components/ui'
import { useAppTheme, useFontFamily } from '@/hooks'

const TextInputMemoized = ({
	label,
	errorMessage,
	RightComponent,
	boxProps,
	disabled = false,
	...rnTextInputProps
}: Readonly<TextInputProps>) => {
	const { colors, font } = useAppTheme()
	const { fontSizes } = useFontFamily()
	const inputRef = useRef<RNTextInput>(null)
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		if (isFocused) {
			inputRef.current?.focus()
		} else {
			inputRef.current?.blur()
		}
	}, [isFocused])

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
		<Box mb="s20" {...boxProps}>
			<Pressable
				accessibilityLabel={label}
				accessibilityState={{
					selected: isFocused,
					disabled: disabled,
				}}
				onPress={() => setIsFocused(true)}
			>
				<Text preset="paragraphMedium" marginBottom="s4">
					{label}
				</Text>
				<Box {...$textInputContainer} testID="container-internal-input">
					<RNTextInput
						ref={inputRef}
						placeholderTextColor={colors.gray2}
						style={$textInputStyle}
						onBlur={() => setIsFocused(false)}
						onFocus={() => setIsFocused(true)}
						editable={!disabled}
						placeholder="Digite aqui"
						testID="internal-input"
						autoCapitalize="none"
						{...rnTextInputProps}
					/>
					{RightComponent && (
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

export const TextInput = memo(TextInputMemoized)
