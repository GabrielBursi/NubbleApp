import { ComponentProps } from 'react'

import { Box } from '@/components'
import { StrictOmit } from '@/types/utils'

export type OnBoardingProgressIndicatorProps = {
	total: number
	currentIndex: number
} & StrictOmit<ComponentProps<typeof Box>, 'role' | 'accessible'>
