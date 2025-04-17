import { BoxProps } from '@/components'
import { StrictOmit } from '@/types/utils'

export type OnBoardingProgressIndicatorProps = {
	total: number
	currentIndex: number
} & StrictOmit<BoxProps, 'role' | 'accessible'>
