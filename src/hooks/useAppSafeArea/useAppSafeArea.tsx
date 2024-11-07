import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppTheme } from '@/hooks'

export const useAppSafeArea = (): Readonly<EdgeInsets> => {
	const { top, ...insets } = useSafeAreaInsets()
	const { spacing } = useAppTheme()

	return {
		top: Math.max(top, spacing.s20),
		...insets,
	}
}
