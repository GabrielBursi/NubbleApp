import { OnboardingPageItem } from '@/types/shared'

export type OnBoardingItemProps = {
	item: OnboardingPageItem
	onPressNext: () => void
	onPressSkip: () => void
}
