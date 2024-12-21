import React, { memo, useRef } from 'react'
import { Pressable, TextInput as RNTextInput } from 'react-native'

import { Box, Text } from '@/components'
import { useAppTheme } from '@/hooks'

import { TextInputMessageProps } from './TextInputMessage.types'

const TextInputMessageMemoized = ({
	onPressSend,
	value = '',
	...rnTextInputProps
}: Readonly<TextInputMessageProps>) => {
	const inputRef = useRef<RNTextInput>(null)
	const { colors, font } = useAppTheme()

	function focusInput() {
		inputRef.current?.focus()
	}

	const sendIsDisabled = value.trim().length === 0

	return (
		<Pressable testID="container-input-message" onPressIn={focusInput}>
			<Box
				paddingHorizontal="s16"
				paddingVertical="s14"
				backgroundColor="gray5"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				borderRadius="s12"
			>
				<RNTextInput
					ref={inputRef}
					value={value}
					placeholder="Digite aqui"
					accessible
					placeholderTextColor={colors.gray2}
					style={[
						// eslint-disable-next-line react-native/no-inline-styles
						{
							padding: 0,
							flexGrow: 1,
							flexShrink: 1,
							fontFamily: font.family.regular,
						},
						{ color: colors.gray1 },
					]}
					{...rnTextInputProps}
				/>
				<Pressable
					role="button"
					accessible
					accessibilityRole="button"
					aria-label="Enviar"
					accessibilityLabel="Enviar"
					aria-disabled={sendIsDisabled}
					disabled={sendIsDisabled}
					onPress={onPressSend}
				>
					<Text color={sendIsDisabled ? 'gray2' : 'primary'} bold>
						Enviar
					</Text>
				</Pressable>
			</Box>
		</Pressable>
	)
}

export const TextInputMessage = memo(TextInputMessageMemoized)
