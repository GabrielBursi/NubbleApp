import { ComponentProps } from 'react'

import { createBox } from '@shopify/restyle'

import { AppTheme } from '@/types/theme'

export const Box = createBox<AppTheme>()
export type BoxProps = ComponentProps<typeof Box>
