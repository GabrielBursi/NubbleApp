import React, { memo, useCallback, useEffect, useState } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, Divider, PressableBox, Text } from '@/components'
import { useRadioButton } from '@/hooks'

import { RadioButtonProps, RadioGroupProps, RadioProps } from './Radio.types'

const RadioMemoized = ({
	checked = false,
	onChange,
	disabled = false,
	...props
}: Readonly<RadioProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, disabled, onChange })

	return (
		<PressableBox
			{...props}
			hitSlop={10}
			onPress={internalOnChange}
			justifyContent="center"
			alignItems="center"
			height={20}
			width={20}
			borderWidth={internalChecked ? 2 : 1}
			borderRadius={'s12'}
			borderColor={internalChecked ? 'primary' : undefined}
			accessible
			accessibilityState={{ checked: internalChecked, disabled }}
			role="radio"
			accessibilityRole="radio"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ opacity: disabled ? 0.5 : 1 }}
			android_disableSound
		>
			{internalChecked && (
				<Box
					backgroundColor={'primary'}
					height={12}
					width={12}
					borderRadius="s12"
					opacity={disabled ? 0.5 : 1}
				/>
			)}
		</PressableBox>
	)
}

const RadioInternal = memo(RadioMemoized)

const RadioButtonMemoized = ({
	label,
	description,
	side = 'left',
	checked = false,
	disabled = false,
	onChange,
	...radioButtonProps
}: Readonly<RadioButtonProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, disabled, onChange })

	return (
		<Box paddingVertical="s16">
			<Box
				flexDirection="row"
				alignItems="flex-start"
				justifyContent="space-between"
				gap="s8"
			>
				{side === 'left' && (
					<PressableBox
						onPress={internalOnChange}
						hitSlop={10}
						android_disableSound
						gap="s4"
						flex={1}
					>
						<Text semiBold>{label}</Text>
						{description && <Text.Expanded>{description}</Text.Expanded>}
					</PressableBox>
				)}
				<RadioMemoized
					{...radioButtonProps}
					disabled={disabled}
					aria-label={label}
					accessibilityLabel={label}
					checked={internalChecked}
					onChange={internalOnChange}
				/>
				{side === 'right' && (
					<PressableBox
						onPress={internalOnChange}
						hitSlop={10}
						android_disableSound
						gap="s4"
						flex={1}
					>
						<Text semiBold>{label}</Text>
						{description && <Text.Expanded>{description}</Text.Expanded>}
					</PressableBox>
				)}
			</Box>
		</Box>
	)
}

const RadioButtonInternal = memo(RadioButtonMemoized)

const RadioGroupInternal = <TOption extends Record<string, unknown>>({
	items: radioOptions,
	descriptionKey: optionDescriptionKey,
	labelKey: optionLabelKey,
	onOptionSelect,
	initialSelectedIndex,
	...props
}: Readonly<RadioGroupProps<TOption>>) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
		null
	)

	const updateSelectedIndex = useCallback(
		(selectedOption: TOption | null = null, selectedIndex?: number) => {
			const foundIndex = radioOptions.findIndex((option, index) => {
				if (selectedOption) return selectedOption === option
				if (selectedIndex !== undefined) return selectedIndex === index
			})

			if (foundIndex >= 0) setSelectedOptionIndex(foundIndex)
		},
		[radioOptions]
	)

	const handleRadioSelection = useCallback(
		(option: TOption, isChecked: boolean) => {
			onOptionSelect?.(option, isChecked)
			updateSelectedIndex(option)
		},
		[onOptionSelect, updateSelectedIndex]
	)

	useEffect(() => {
		updateSelectedIndex(null, initialSelectedIndex)
	}, [initialSelectedIndex, updateSelectedIndex])

	return (
		<FlashList<TOption>
			{...props}
			data={radioOptions}
			bounces={false}
			keyExtractor={(option, index) =>
				`${String(option[optionLabelKey])}-${index}`
			}
			renderItem={({ item: option, index }) => (
				<RadioButtonInternal
					{...option}
					label={String(option[optionLabelKey])}
					description={
						optionDescriptionKey && String(option[optionDescriptionKey])
					}
					onChange={(isChecked) => handleRadioSelection(option, isChecked)}
					checked={index === selectedOptionIndex}
				/>
			)}
			extraData={selectedOptionIndex}
			ItemSeparatorComponent={Divider}
			estimatedItemSize={400 * 60}
			disableAutoLayout
			accessible
			accessibilityLabel="radio-group"
			accessibilityRole="radiogroup"
			role="radiogroup"
			showsHorizontalScrollIndicator
			showsVerticalScrollIndicator={false}
		/>
	)
}

type RadioInternal = typeof RadioInternal
type RadioButtonInternal = typeof RadioButtonInternal
type RadioGroupInternal = typeof RadioGroupInternal
type CompoundRadioComponent = RadioInternal & {
	Button: RadioButtonInternal
	Group: RadioGroupInternal
}

export const Radio = RadioInternal as CompoundRadioComponent
Radio.Button = RadioButtonInternal
Radio.Group = RadioGroupInternal
