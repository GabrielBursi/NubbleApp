import { OnboardingPageItem } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

export type OnBoardingContentProps = StrictOmit<OnboardingPageItem, 'image'>
