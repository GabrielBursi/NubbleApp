import { theme } from '@/styles'

type Theme = typeof theme

declare module 'styled-components/native' {
	export interface DefaultTheme extends Theme {}
}
