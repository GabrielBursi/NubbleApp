import React, { useRef } from 'react'
import { RefreshControl } from 'react-native'

import { useScrollToTop } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import { EmptyList } from '@/components'
import { usePaginatedList } from '@/hooks'

import { InfinityScrollListProps } from './InfinityScrollList.types'

export const InfinityScrollList = <TItem extends object>({
	queryOpt,
	getList,
	errorMessage,
	emptyMessage,
	accessibilityLabel,
	...flashListProps
}: Readonly<InfinityScrollListProps<TItem>>) => {
	const { list, isError, isLoading, refreshList, fetchNextPage } =
		usePaginatedList(getList, queryOpt)

	const flatListRef = useRef<FlashList<TItem>>(null)
	//TODO: atualizar react navigation https://github.com/react-navigation/react-navigation/commit/a1f947a44f16a8d846c31d76efb0485780bd8de3
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	useScrollToTop(flatListRef as any)

	return (
		<FlashList
			{...flashListProps}
			ref={flatListRef}
			data={list}
			role="list"
			accessibilityRole="list"
			accessible
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			disableAutoLayout
			aria-label={accessibilityLabel}
			// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
			onEndReached={fetchNextPage}
			onEndReachedThreshold={0.1}
			refreshing={isLoading}
			refreshControl={
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				<RefreshControl refreshing={isLoading} onRefresh={refreshList} />
			}
			ListEmptyComponent={
				<EmptyList
					refetch={refreshList}
					error={isError}
					loading={isLoading}
					errorMessage={errorMessage}
					emptyMessage={emptyMessage}
				/>
			}
		/>
	)
}
