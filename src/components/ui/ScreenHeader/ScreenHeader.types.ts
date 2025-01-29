import { ScreenTemplateProps } from '@/templates/Screen/Screen.types'

export type ScreenHeaderProps = Pick<
	ScreenTemplateProps,
	'title' | 'canGoBack' | 'HeaderComponent'
>
