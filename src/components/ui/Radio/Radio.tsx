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

const RadioGroupInternal = <TItem extends Record<string, unknown>>({
	items,
	descriptionKey,
	labelKey,
	onSelect,
	initialItemIndexSelected,
	...props
}: Readonly<RadioGroupProps<TItem>>) => {
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
		null
	)

	const findItem = useCallback(
		(itemSelected: TItem | null = null, indexSelected?: number) => {
			const itemSelectedIndex = items.findIndex((item, index) => {
				if (itemSelected) return itemSelected === item
				if (indexSelected !== undefined) return indexSelected === index
			})
			if (itemSelectedIndex >= 0) setSelectedItemIndex(itemSelectedIndex)
		},
		[items]
	)

	const handleSelectRadio = useCallback(
		(item: TItem, checked: boolean) => {
			onSelect?.(item, checked)
			findItem(item)
		},
		[onSelect, findItem]
	)

	useEffect(() => {
		findItem(undefined, initialItemIndexSelected)
	}, [initialItemIndexSelected, findItem])

	return (
		<FlashList<TItem>
			{...props}
			data={items}
			bounces={false}
			keyExtractor={(item, index) => `${String(item[labelKey])}-${index}`}
			renderItem={({ item, index }) => (
				<RadioButtonInternal
					{...item}
					label={String(item[labelKey])}
					description={descriptionKey && String(item[descriptionKey])}
					onChange={(checked) => handleSelectRadio(item, checked)}
					checked={index === selectedItemIndex}
				/>
			)}
			extraData={selectedItemIndex}
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
