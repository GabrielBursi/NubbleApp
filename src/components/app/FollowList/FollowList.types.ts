import { FollowUserModel } from '@/domain/Follow'
import { StrictOmit } from '@/types/utils'

import { InfinityScrollListProps } from '../InfinityScrollList/InfinityScrollList.types'

type FollowListVariants = 'following' | 'followers'

export type FollowListProps = StrictOmit<
	InfinityScrollListProps<FollowUserModel>,
	| 'getList'
	| 'queryOpt'
	| 'accessibilityLabel'
	| 'estimatedItemSize'
	| 'keyExtractor'
	| 'emptyMessage'
	| 'errorMessage'
	| 'renderItem'
> & {
	type: FollowListVariants
}

type ListCommonProps = Pick<
	InfinityScrollListProps<FollowUserModel>,
	| 'getList'
	| 'queryOpt'
	| 'accessibilityLabel'
	| 'errorMessage'
	| 'emptyMessage'
> & {
	buttonTitle: string
	canUndoAction: boolean
	toastMessage: string
}

export type ConfigPropsTypeFollowList = Record<
	FollowListVariants,
	ListCommonProps
>
