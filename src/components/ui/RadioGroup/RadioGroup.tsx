import React, { useCallback, useEffect, useState } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Divider, RadioButtonItem } from '@/components'

import { RadioGroupProps } from './RadioGroup.types'

export const RadioGroup = <TItem extends Record<string, unknown>>({
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
				<RadioButtonItem
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
