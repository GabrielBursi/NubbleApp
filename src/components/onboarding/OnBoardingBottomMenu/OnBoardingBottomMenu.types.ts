import { OnboardingPageItem } from '@/types/shared'

import { OnBoardingItemProps } from '../OnBoardingItem/OnBoardingItem.types'

export type OnBoardingBottomMenuProps = Pick<
	OnBoardingItemProps,
	'onPressNext' | 'onPressSkip'
> &
	Pick<OnboardingPageItem, 'isLast'>
