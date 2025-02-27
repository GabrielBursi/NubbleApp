import React, { memo, useCallback, useEffect, useState } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, Divider, PressableBox, Text } from '@/components'
import { useRadioButton } from '@/hooks'

import {
	OptionSelected,
	RadioButtonProps,
	RadioGroupProps,
	RadioProps,
} from './Radio.types'

const RadioMemoized = ({
	checked = false,
	onChange,
	disabled = false,
	canUncheck = true,
	...props
}: Readonly<RadioProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, onChange, canUncheck })

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
			disabled={disabled}
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
	canUncheck = true,
	onChange,
	...radioButtonProps
}: Readonly<RadioButtonProps>) => {
	const { checked: internalChecked, onChange: internalOnChange } =
		useRadioButton({ checked, onChange, canUncheck })

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
						disabled={disabled}
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
					canUncheck={canUncheck}
				/>
				{side === 'right' && (
					<PressableBox
						onPress={internalOnChange}
						hitSlop={10}
						android_disableSound
						gap="s4"
						flex={1}
						disabled={disabled}
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
		(index: number) => {
			const foundIndex = radioOptions.findIndex((_o, i) => i === index)
			if (foundIndex >= 0) setSelectedOptionIndex(foundIndex)
		},
		[radioOptions]
	)

	const handleRadioSelection = useCallback(
		({ checked, option, index }: OptionSelected<TOption>) => {
			onOptionSelect?.({ checked, index, option })
			updateSelectedIndex(index)
		},
		[onOptionSelect, updateSelectedIndex]
	)

	useEffect(() => {
		if (initialSelectedIndex !== undefined)
			updateSelectedIndex(initialSelectedIndex)
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
					canUncheck={false}
					description={
						optionDescriptionKey &&
						option[optionDescriptionKey] &&
						String(option[optionDescriptionKey])
					}
					onChange={(checked) =>
						handleRadioSelection({ index, option, checked })
					}
					checked={index === selectedOptionIndex}
				/>
			)}
			extraData={selectedOptionIndex}
			ItemSeparatorComponent={Divider}
			estimatedItemSize={60}
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
