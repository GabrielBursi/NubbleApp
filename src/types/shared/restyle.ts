import {
	BackgroundColorProps,
	BorderProps,
	LayoutProps,
	SpacingProps,
	SpacingShorthandProps,
} from '@shopify/restyle'

import { AppTheme } from '../theme'

export type RestyleTypes = BackgroundColorProps<AppTheme> &
	SpacingProps<AppTheme> &
	LayoutProps<AppTheme> &
	BorderProps<AppTheme> &
	SpacingShorthandProps<AppTheme>
