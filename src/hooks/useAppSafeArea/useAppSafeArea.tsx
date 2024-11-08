import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '@/hooks'

export const useAppSafeArea = (): Readonly<EdgeInsets> => {
	const { top, bottom, ...insets } = useSafeAreaInsets()
	const { spacing } = useAppTheme()

	return {
		top: Math.max(top, spacing.s20),
		bottom: Math.max(bottom, spacing.s20),
		...insets,
	}
}
