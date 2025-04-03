import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { ReturnHookMocked } from '@/types/tests'

export const mockUseNavigation: ReturnHookMocked<
	typeof useNavigation<NativeStackNavigationProp<ParamListBase>>
> = {
	goBack: jest.fn(),
	navigate: jest.fn(),
	reset: jest.fn(),
	push: jest.fn(),
}
