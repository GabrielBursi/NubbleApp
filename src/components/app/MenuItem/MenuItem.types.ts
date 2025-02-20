import { PressableProps } from 'react-native'

export type MenuItemProps = {
	label: string
	onPress?: PressableProps['onPress']
}
