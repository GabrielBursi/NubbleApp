import React, {
	ComponentProps,
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Pressable, TextInput as RNTextInput, TextStyle } from 'react-native'

import { Box } from '@/components/ui/Box/Box'
import { Icon } from '@/components/ui/Icon/Icon'
import { RightIconTextInput } from '@/components/ui/RightIconTextInput/RightIconTextInput'
import { Text } from '@/components/ui/Text/Text'
import { useAppTheme, useFontFamily } from '@/hooks'

import {
	EmailInputProps,
	PasswordInputProps,
	SearchInputProps,
	SendInputProps,
	TextInputProps,
} from './TextInput.types'

const TextInputInternalMemoized = forwardRef<
	RNTextInput,
	Readonly<TextInputProps>
>(
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

		const handleClearInput = useCallback(() => {
			internalRef.current?.clear()
			internalRef.current?.focus()
			const onChangeTextProp = rnTextInputProps.onChangeText
			onChangeTextProp?.('')
		}, [rnTextInputProps.onChangeText])

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
			<Box flexGrow={1} flexShrink={1} {...boxProps}>
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
							onClear={handleClearInput}
							value={rnTextInputProps.value}
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

const TextInputInternal = memo(TextInputInternalMemoized)

const EmailInputInternalMemoized = forwardRef<
	RNTextInput,
	Readonly<EmailInputProps>
>(({ label = 'E-mail', ...props }, ref) => {
	return (
		<TextInputInternal
			label={label}
			ref={ref}
			placeholder="Digite seu e-mail"
			RightComponent={<Icon color="gray2" name={'message'} />}
			{...props}
			keyboardType="email-address"
			autoCapitalize="none"
			autoComplete="email"
			autoCorrect={false}
		/>
	)
})

const EmailInputInternal = memo(EmailInputInternalMemoized)

const PasswordInputInternalMemoized = forwardRef<
	RNTextInput,
	Readonly<PasswordInputProps>
>(({ label = 'Senha', ...props }, ref) => {
	const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

	const toggleSecureTextEntry = () => {
		setIsSecureTextEntry((prev) => !prev)
	}

	return (
		<TextInputInternal
			label={label}
			placeholder="Digite sua senha"
			{...props}
			allowClear={false}
			ref={ref}
			RightComponent={
				<Icon
					onPress={toggleSecureTextEntry}
					color="gray2"
					name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
				/>
			}
			secureTextEntry={isSecureTextEntry}
		/>
	)
})

const PasswordInputInternal = memo(PasswordInputInternalMemoized)

const SendInputMemoizedInternal = forwardRef<
	RNTextInput,
	Readonly<SendInputProps>
>(({ onPressSend, value = '', ...rnTextInputProps }, externalRef) => {
	const internalRef = useRef<RNTextInput>(null)
	useImperativeHandle(externalRef, () => internalRef.current!, [])

	const { colors, font } = useAppTheme()

	function focusInput() {
		internalRef.current?.focus()
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
					ref={internalRef}
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
})

const SendInputInternal = memo(SendInputMemoizedInternal)

const SearchInputInternalMemoized = forwardRef<
	RNTextInput,
	Readonly<SearchInputProps>
>((props, ref) => {
	return (
		<TextInputInternal
			ref={ref}
			placeholder="Procure aqui"
			{...props}
			LeftComponent={<Icon color="gray3" name="search" />}
		/>
	)
})

const SearchInputInternal = memo(SearchInputInternalMemoized)

type TextInputComponent = typeof TextInputInternal
type EmailInputComponent = typeof EmailInputInternal
type PasswordInputComponent = typeof PasswordInputInternal
type SendInputComponent = typeof SendInputInternal
type SearchInputComponent = typeof SearchInputInternal
type CompoundTextInput = TextInputComponent & {
	Email: EmailInputComponent
	Password: PasswordInputComponent
	Send: SendInputComponent
	Search: SearchInputComponent
}

export const TextInput = TextInputInternal as CompoundTextInput
TextInput.Email = EmailInputInternal
TextInput.Password = PasswordInputInternal
TextInput.Send = SendInputInternal
TextInput.Search = SearchInputInternal
