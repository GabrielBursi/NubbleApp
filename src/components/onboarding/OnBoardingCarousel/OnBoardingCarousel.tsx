import React, { useCallback, useRef, useState } from 'react'
import { FlatList } from 'react-native'

import { OnBoardingItem } from '@/components'
import { OnboardingPageItem } from '@/types/shared'

import { OnBoardingCarouselProps } from './OnBoardingCarousel.types'

export const OnBoardingCarousel = ({
	items = [],
}: Readonly<OnBoardingCarouselProps>) => {
	const [pageIndex, setPageIndex] = useState(0)

	const flatListRef = useRef<FlatList<OnboardingPageItem>>(null)

	const onFinishOnboarding = useCallback(() => {
		//TODO: implementar
		console.log('Finish onboarding')
	}, [])

	const onPressNext = useCallback(() => {
		const isLastPage = pageIndex === items.length - 1
		if (isLastPage) {
			onFinishOnboarding()
		} else {
			const nextIndex = pageIndex + 1
			flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
			setPageIndex(nextIndex)
		}
	}, [items.length, onFinishOnboarding, pageIndex])

	return (
		<FlatList
			ref={flatListRef}
			data={items}
			keyExtractor={({ subtitle }, index) => `${subtitle}-${index}`}
			renderItem={({ item }) => (
				<OnBoardingItem
					item={item}
					onPressNext={onPressNext}
					onPressSkip={onFinishOnboarding}
					isLast={item.isLast}
					index={pageIndex}
					total={items.length}
				/>
			)}
			bounces={false}
			scrollEnabled={false}
			showsHorizontalScrollIndicator={false}
			horizontal
			role="list"
			accessible
			accessibilityLabel="onboarding-carousel"
		/>
	)
}
