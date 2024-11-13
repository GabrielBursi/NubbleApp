import { HookMocked } from '@/types/tests'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export const mockUseNavigation: HookMocked<
	typeof useNavigation<NavigationProp<ReactNavigation.RootParamList>>
> = {
	goBack: jest.fn(),
	navigate: jest.fn(),
	reset: jest.fn(),
}
