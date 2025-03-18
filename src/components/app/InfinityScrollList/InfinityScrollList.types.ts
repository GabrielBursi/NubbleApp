import { FlashListProps } from '@shopify/flash-list'

import { usePaginatedList } from '@/hooks'
import { RequiredProps, StrictOmit } from '@/types/utils'

import { EmptyListProps } from '../EmptyList/EmptyList.types'

export type InfinityScrollListProps<
	TItem extends object = Record<string, unknown>,
> = {
	queryOpt: Parameters<typeof usePaginatedList<TItem>>[1]
	getList: Parameters<typeof usePaginatedList<TItem>>[0]
} & Pick<EmptyListProps, 'emptyMessage' | 'errorMessage'> &
	RequiredProps<
		StrictOmit<
			FlashListProps<TItem>,
			| 'role'
			| 'accessibilityRole'
			| 'accessible'
			| 'showsHorizontalScrollIndicator'
			| 'showsVerticalScrollIndicator'
			| 'refreshing'
			| 'refreshControl'
			| 'disableAutoLayout'
			| 'aria-label'
			| 'onEndReached'
			| 'onEndReachedThreshold'
			| 'data'
			| 'ListEmptyComponent'
		>,
		'accessibilityLabel' | 'estimatedItemSize' | 'keyExtractor'
	>
