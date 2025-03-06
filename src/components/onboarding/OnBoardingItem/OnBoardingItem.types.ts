import { OnboardingPageItem } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

export type OnBoardingItemProps = {
	item: StrictOmit<OnboardingPageItem, 'index' | 'isLast' | 'total'>
	onPressNext: () => void
	onPressSkip: () => void
} & Pick<OnboardingPageItem, 'isLast' | 'index' | 'total'>
