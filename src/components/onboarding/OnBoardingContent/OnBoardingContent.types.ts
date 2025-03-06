import { OnboardingPageItem } from '@/types/shared'

export type OnBoardingContentProps = Pick<
	OnboardingPageItem,
	'subtitle' | 'title' | 'total' | 'index'
>
