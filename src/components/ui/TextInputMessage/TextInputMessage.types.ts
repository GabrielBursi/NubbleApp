import { PressableProps, TextInputProps } from 'react-native'

import { NonUndefined } from '@/types/utils'

export type TextInputMessageProps = {
	onPressSend: NonUndefined<PressableProps['onPress']>
} & TextInputProps
